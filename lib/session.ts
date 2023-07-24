import {
  NextAuthOptions,
  User,
  Account,
  Session,
  DefaultSession,
  getServerSession,
  RequestInternal,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider, {
  CredentialInput,
  CredentialsConfig,
} from "next-auth/providers/credentials";
import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserDetails } from "@/common.types";
import { NextApiRequest, NextApiResponse } from "next";
import { UserValidate, isUserAvailable } from "./validate";
import { compare } from "bcryptjs";
import { createNewUser } from "@/firebase/actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<any> {
        if (!credentials) return;

        const result = await isUserAvailable(credentials.email);

        if (result) {
          if (result.provider === "google") {
            throw new Error(
              "Please log in using your Google account to access your account."
            );
          } else {
            // compare()
            const checkPassword = await compare(
              credentials.password,
              result.password
            );

            // incorrect password
            if (!checkPassword) {
              throw new Error("Password doesn't match");
            }
            return result;
          }
        } else {
          throw new Error("No account is associated with this email !");
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: any;
    }): Promise<boolean> {
      // console.log("user", user);
      // console.log("account", account);

      if (account?.provider === "google") {
        const isUser = await UserValidate(user.email);
        if (isUser) {
          return Promise.resolve(true);
        } else {
          const userData = {
            id: user.id,
            name: user.name || "",
            username: user.email || "",
            email: user.email || "",
            password: null,
            image: user.image || "",
            provider: "google",
            description: "",
            githubUrl: "",
            linkedInUrl: "",
          };
          await createNewUser(userData);
          return Promise.resolve(true);
        }
      } else {
        return Promise.resolve(true);
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
