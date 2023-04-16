import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      id: string;
      email: string;
      role: {
        id: number,
        name: string
      }
    }
  }
  interface AdapterUser {
    name: string;
    id: string;
    email: string;
    role: {
      id: number,
      name: string
    }
  }
}
