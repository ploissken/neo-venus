import { NextRequest, NextResponse } from "next/server";
import { SignInFormInputs } from "@/features/user/sign-in/SignInForm";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/user/sign-in";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const requestBody: SignInFormInputs = await req.json();

  try {
    const response = await fetch(`${BASE_URL}${SERVICE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();

    if (responseData.ok) {
      const nextRes = NextResponse.json(responseData);

      const setCookie = response.headers.get("set-cookie");
      if (setCookie) {
        nextRes.headers.set("set-cookie", setCookie);
      }

      return nextRes;
    } else {
      return NextResponse.json(responseData);
    }
  } catch {
    return NextResponse.json({
      ok: false,
      error: `sign_in_error`,
    });
  }
}
