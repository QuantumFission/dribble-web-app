import {
    NextAuthOptions,
    User,
    Account,
    getServerSession,
    RequestInternal,
    Session,
    DefaultSession,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { SessionInterface } from "@/common.types";
import {
    UserValidate,
    UserValidateWithMail,
    isUserAvailable,
} from "./validate";
import { compare } from "bcryptjs";
import { createNewUser } from "@/firebase/actions";
import { JWT } from "next-auth/jwt";

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
                req: Pick<
                    RequestInternal,
                    "body" | "query" | "headers" | "method"
                >
            ): Promise<any> {
                if (!credentials) return;

                const result = await UserValidateWithMail(credentials.email);

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
                            throw new Error("Email or Password is wrong !");
                        }
                        return result;
                    }
                } else {
                    throw new Error(
                        "No account is associated with this email !"
                    );
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
                if (user.email) {
                    const isUser = await UserValidateWithMail(user.email);
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
                    return Promise.reject();
                }
            } else {
                return Promise.resolve(true);
            }
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({
            session,
            token,
            user,
        }: {
            session: any;
            token: JWT;
            user: AdapterUser;
        }) {
            if (token.accessToken) {
                session.accessToken = token.accessToken;
                session.user.id = token.sub;
            } else {
                session.accessToken = token.sub;
                session.user.id = token.sub;
            }
            return session;
        },
    },
};

export async function getCurrentUser(): Promise<SessionInterface | null> {
    try {
        const session = (await getServerSession(
            authOptions
        )) as SessionInterface;
        if (session) {
            return session;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
