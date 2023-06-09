import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

interface CredentialsWithPassword extends Record<any, any> {
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialsWithPassword, req) {
        const loginData = {
          email: credentials.email,
          password:  credentials.password
        }

        const res = await fetch("http://localhost:8080/api/auth/", {
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
      // @ts-ignore
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
  },
  events: {},
};

export default NextAuth(options);
