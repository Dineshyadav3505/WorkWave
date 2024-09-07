import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default async function auth(req) {

  const cookies = req.cookies;

  if (!cookies) {
    return null;
  }
  
  const accessToken =
    cookies.get("accessToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return null;
  }

  const decoded = jwt.verify(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET);

  return decoded.id;
}
