import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import { JWT } from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";

const options: NextAuthOptions = {
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }
      return token as JWT;
    },
    session: async (params: { session: Session; user: User | AdapterUser; token: JWT; }) => {
      params.session.userId = params.token.userId;
      params.session.email = params.token.email;

      return params.session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  events: {},
};

export default NextAuth(options);
