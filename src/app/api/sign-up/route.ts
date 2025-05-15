import { NextRequest, NextResponse } from "next/server";
import { IdentityFormInputs } from "@/features/sign-up/identity-step/IdentityForm";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/sign-up/create";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const requestBody: IdentityFormInputs = await req.json();

  try {
    const response = await fetch(`${BASE_URL}${SERVICE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({
        ok: true,
        data: data.account,
      });
    } else {
      return NextResponse.json({
        ok: false,
        data,
      });
    }
  } catch {
    return NextResponse.json({
      ok: false,
      error: `sign_up_error`,
    });
  }
}
