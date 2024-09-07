import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default async function auth(req) {

  const cookies = req.cookies;
  
  const accessToken =
    cookies.get("accessToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json(
      { message: "You are not authorized to access this route" },
      { status: 401 }
    );
  }

  const decoded = jwt.verify(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET);

  return decoded.id;
}
