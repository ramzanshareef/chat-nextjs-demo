import { NextResponse } from "next/server";

export async function middleware(request) {
    let pathname = request.nextUrl.pathname;
    if (pathname === "/") {
        let token = request.cookies.get("userToken");
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }
    else if (pathname === "/login" || pathname === "/signup") {
        let token = request.cookies.get("userToken");
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
}