// middleware.js
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const response = await axios.post(`${request.nextUrl.origin}/api/user/getUser`, {
      token: accessToken.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userData = response.data; 

    return NextResponse.next();

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};