import { handleServerError } from "@/lib/endpoint.proxy";
import { authProxyFetch } from "@/lib/fetch.proxy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const serviceUrl = "/user/username-available";

  const url = new URL(req.url);
  const username = url.searchParams.get("u");

  const response = await authProxyFetch(
    req,
    `${serviceUrl}?username=${username}`
  );

  if (!response.ok) {
    return await handleServerError(response);
  }

  const responseJson = await response.json();
  return NextResponse.json(responseJson);
}
