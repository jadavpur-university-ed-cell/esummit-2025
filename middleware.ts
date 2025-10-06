export { auth as middleware } from "@/auth"
export const config = {
  matcher: ["/dashboard", "/events/:path*", "/admin/:path*","/merchandise"], 
  // runtime: "nodejs"  
};