import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import { JWT } from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials"
import {mockProviders} from "next-auth/client/__tests__/helpers/mocks";




const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const loginData = {
          identifier: credentials.email,
          password:  credentials.password
        }

        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null
      },

    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  events: {},
};

export default NextAuth(options);
