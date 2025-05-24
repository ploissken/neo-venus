import { NextRequest, NextResponse } from "next/server";
import { SignInFormInputs } from "@/features/user/sign-in/SignInForm";
import { anonProxyFetch } from "@/lib/fetch.proxy";

export async function POST(req: NextRequest) {
  const servicePath = "/user/sign-in";
  const credentials: SignInFormInputs = await req.json();

  const response = await anonProxyFetch(req, servicePath, credentials);

  if (!response.ok) {
    return NextResponse.json(response);
  }

  const responseData = await response.json();
  const nextRes = NextResponse.json(responseData);

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    nextRes.headers.set("set-cookie", setCookie);
  }

  return nextRes;
}
