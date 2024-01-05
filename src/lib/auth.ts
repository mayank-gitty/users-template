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
    // signOut: "/auth/signout",
    // error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interestll)
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
        console.log("credentialssssssssssssssssssssssssssssssssssssssssssssssssssssssP", credentials.company);

        const user = {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          role:credentials.role,
          company_id:credentials.company_id,
          company_name:credentials.company_id
        }

        return user;
    
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("token", token);
      console.log("user", user);
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token, user }) => {
      // session.user = token.user
      console.log("stoken", session);
      console.log("--token", token);
      session && (session.user = token);

      // console.log('ssession',user)
      // session.user = user;
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
