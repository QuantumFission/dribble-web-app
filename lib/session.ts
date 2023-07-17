import {
  NextAuthOptions,
  User,
  Account,
  Session,
  DefaultSession,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    }): Promise<string | boolean> {
      // console.log(user);
      // console.log(account);
      // console.log(profile);
        const userDetails = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        description: "",
        githubUrl: "",
        linkedInUrl: "",
        password: "",
        username: ""
      };
      try {
        const userCollectionRef = doc(db, "userCollection", user?.id);
        const isUser = await getDoc(userCollectionRef);
        if(isUser.exists()) {
          console.log(true);
        } else {
          await setDoc(userCollectionRef, userDetails);
        }
      } catch (error) {
        console.log(error);
      } finally {
        return Promise.resolve(true);
      }
    },
    async jwt({ token }: { token: JWT }): Promise<JWT> {
      return token;
    },
    async session({ session, token }: {
      session: Session;
      token: JWT;
    }): Promise<Session | DefaultSession> {

      const newSession = {
        ...session,
        user: { ...session.user, id: token.sub },
      };

      return newSession;
    },
  },
};
