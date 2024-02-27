import { NextResponse } from "next/server";

export async function middleware(request) {
    let pathname = request.nextUrl.pathname;
    const regex = /^\/(chats|chat\/\w+)?$/;

    const authRoutes = ["/login", "/signup"];
    const protectedRoutes = ["/profile"];

    if (regex.test(pathname)){
        let token = request.cookies.get("userToken");
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }
    else if (authRoutes.includes(pathname)) {
        let token = request.cookies.get("userToken");
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
}