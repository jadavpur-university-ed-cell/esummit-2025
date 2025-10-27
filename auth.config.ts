import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

const ALLOWED_DOMAINS = [
  "@gmail.com",
  "@jadavpuruniversity.in",
  "@juecell.com",
];

export default{
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async session({session, token}){
      if (token) {
        session.user.id = String(token.id);
        session.user.name = token.name;
        session.user.email = token.email!;
        //session.user.image = token.picture;
        session.user.role = typeof token.role === "string" ? token.role : "USER";
			}
      return session;
    },
  }
} satisfies NextAuthConfig;