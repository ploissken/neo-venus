import { NextRequest, NextResponse } from "next/server";
import { IdentityFormInputs } from "@/features/user/sign-up/identity-step/IdentityForm";
import { anonProxyFetch } from "@/lib/fetch.proxy";

export async function POST(req: NextRequest) {
  const servicePath = "/sign-up/create";
  const requestBody: IdentityFormInputs = await req.json();

  const response = await anonProxyFetch(req, servicePath, requestBody);

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
