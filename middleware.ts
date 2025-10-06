// export { auth as middleware } from "@/auth"
// export const config = {
//   matcher: ["/dashboard", "/events/:path*", "/admin/:path*","/merchandise"], 
//   // runtime: "nodejs"  
// };

import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);

export default auth((req)=>{
    // const isLoggedIn = !!req.auth;
    // const role = req.auth?.user.role;
    // const {nextUrl} = req;

    //console.log(req.auth);

    // // add list of protected routes to given array
    // const isProtectedRoute = ["/Bidder"].includes(nextUrl.pathname);

    // // all admin routes to start with /admin
    // const isAdminRoute = (nextUrl.pathname).startsWith("/admin");

    // // USER ROUTES
    // if(isProtectedRoute && !isLoggedIn) return NextResponse.redirect(`${nextUrl.origin}/`);

    // // ADMIN ROUTES
    // if(isAdminRoute && role!=="ADMIN") return NextResponse.redirect(`${nextUrl.origin}/Bidder`);

    return NextResponse.next()

})

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
}