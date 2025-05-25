import { NextRequest, NextResponse } from "next/server";
import { ProfileFormInputs } from "@/features/user/sign-up/profile-step/ProfileForm";
import { handleServerError, authProxyFetch } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  const servicePath = "/user/update";
  const requestBody: ProfileFormInputs = await req.json();

  const response = await authProxyFetch(req, servicePath, requestBody);

  if (!response.ok) {
    return await handleServerError(response);
  }

  const { data } = await response.json();
  return NextResponse.json({ user: data });
}
