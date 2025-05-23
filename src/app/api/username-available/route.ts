import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/user/username-available";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }
  const url = new URL(req.url);
  const username = url.searchParams.get("u");
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  try {
    const response = await fetch(
      `${BASE_URL}${SERVICE_PATH}?username=${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token?.value}`,
        },
      }
    );

    const responseJson = await response.json();
    return NextResponse.json(responseJson);
  } catch {
    return NextResponse.json({
      ok: false,
      error: `username_check_error`,
    });
  }
}
