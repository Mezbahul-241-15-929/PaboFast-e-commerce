import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { colletionNameObj } from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await loginUser(credentials);

                if (!user) return null;

                return user;
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],

    pages: {
        signIn: "/login"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account) {
                // console.log("from sigin callback",{user,account,profile,email,credentials})
                try {
                    const { providerAccountId, provider } = account;
                    const { email: user_email, image, name } = user;
                    const playload = { role: "user", providerAccountId, provider, user_email, image, name };
                    console.log("from sigin callback", playload);

                    const userCollection = dbConnect(colletionNameObj.userColletion);
                    const isUserExist = await userCollection.findOne({ providerAccountId });

                    if (!isUserExist) {
                        await userCollection.insertOne(playload)
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            }

            return true
        }
    }
}