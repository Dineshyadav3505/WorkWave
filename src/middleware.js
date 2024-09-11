// middleware.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Access the cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/user/getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({ token: accessToken.value }),
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userData = await response.json();

    return NextResponse.next();

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};