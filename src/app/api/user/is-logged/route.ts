import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const nextRes = NextResponse.json({ hasAuthToken: !!token?.value });

  return nextRes;
}
