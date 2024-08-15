
import NextAuth, { NextAuthOptions} from "next-auth";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import GitHub from "next-auth/providers/github";
var jwt = require("jsonwebtoken");
import { JWT } from "next-auth/jwt"; 

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({ 
      clientId: process.env.GITHUB_ID!,  
      clientSecret: process.env.GITHUB_SECRET!,

    }), 
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  
    }), 
      Yandex({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,  
    })
  ],  
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt"},

  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jwt.sign(token!, secret, {
        algorithm: "HS256",
      });

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },

  callbacks: {
    async jwt({ token }: any) {
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "X-hasura-allowed-roles": ["user"],
          "X-hasura-default-role": "user",
          "X-hasura-role": "user",
          "X-hasura-user-id": token.sub,
        },
      };
    },

    session: async ({ session, token }: { session: any; token: any }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

