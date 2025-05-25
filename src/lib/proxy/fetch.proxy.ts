import { NextRequest, NextResponse } from "next/server";
import { getEndpoint } from "./endpoint.proxy";
import { cookies } from "next/headers";

async function proxyFetch(
  req: NextRequest,
  serviceUrl: string,
  requestBody = {},
  options: RequestInit = {},
  credentials: "include" | "omit"
) {
  try {
    const serviceEndpoint = getEndpoint(serviceUrl);

    const response = await fetch(serviceEndpoint, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: req.method !== "GET" ? JSON.stringify(requestBody) : undefined,
      credentials,
    });

    const proxyResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

    return proxyResponse;
  } catch (err) {
    let message = "Unexpected error";
    const status = 500;

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function anonProxyFetch(
  req: NextRequest,
  serviceUrl: string,
  requestBody = {},
  options: RequestInit = {}
) {
  return proxyFetch(req, serviceUrl, requestBody, options, "omit");
}

export async function authProxyFetch(
  req: NextRequest,
  serviceUrl: string,
  requestBody = {},
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return proxyFetch(
    req,
    serviceUrl,
    requestBody,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        Cookie: `token=${token?.value}`,
      },
    },
    "include"
  );
}
