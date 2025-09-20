import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
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
        return !!(emailVerified && domainAllowed);
      }
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});