import { NextResponse } from "next/server";

export default function middleware(request) {
    const response = NextResponse.next();
    return response;
}
