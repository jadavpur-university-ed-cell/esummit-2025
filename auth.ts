import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import {prisma} from "@/prisma/client"

const ALLOWED_DOMAINS = [
  "@gmail.com",
  "@jadavpuruniversity.in",
  "@juecell.com",
];
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
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
    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "linkedin") {
        const email = profile?.email ?? "";
        const emailVerified = profile?.email_verified ?? true; // BUG:LinkedIn doesn't have `email_verified`
        const domainAllowed = ALLOWED_DOMAINS.some((domain) =>
          email.endsWith(domain)
        );
        if (!emailVerified || !domainAllowed) return false;

        //first time checking of user is done
        const exisitingUser = await prisma.user.findUnique({ where: { email } });
        if (!exisitingUser) {
          await prisma.user.create({
            data: {
              email: email,
              name: profile?.name ?? "",
              role: "USER",
            },
          });          
          return true;
        }
      }
      return true;
    },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });

      
      if (dbUser) {
        session.user.id = dbUser.id;
      }
      console.log("auth.ts session is: ", session );
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});