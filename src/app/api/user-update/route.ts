import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ProfileFormInputs } from "@/features/user/sign-up/profile-step/ProfileForm";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/user/update";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const requestBody: ProfileFormInputs = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  try {
    const response = await fetch(`${BASE_URL}${SERVICE_PATH}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();
    const nextRes = NextResponse.json(responseData);

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextRes.headers.set("set-cookie", setCookie);
    }

    return nextRes;
  } catch {
    return NextResponse.json({
      ok: false,
      error: `user_update_error`,
    });
  }
}
