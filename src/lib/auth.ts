// @ts-ignore
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { keystoneContext } from "@/keystone/context";
// Define mutation

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 480,
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          role: credentials.role,
          company_id: credentials.company_id,
          company_name: credentials.company_name,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token, user }) => {
      session && (session.user = token);
      return session;
    },
    // async redirect({ url, baseUrl }) {

    //   console.log('sss')
    //   // Allows relative callback URLs
    //   // if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // // Allows callback URLs on the same origin
    //   // else if (new URL(url).origin === baseUrl) return url
    //   return "/";
    // },
  },
};
