import { NextResponse } from "next/server";

export async function middleware(request) {
    let token = request.cookies.get("userToken");
    if (token?.value) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/signup", "/login"]
};