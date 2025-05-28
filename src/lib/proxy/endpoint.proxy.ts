import { NextResponse } from "next/server";

export function getEndpoint(serviceUrl: string) {
  const BASE_URL = process.env.API_BASE_URL;
  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  return serviceUrl.startsWith("http")
    ? serviceUrl
    : `${BASE_URL}${serviceUrl}`;
}

export async function handleServerError(response: NextResponse) {
  try {
    const errorBody = await response.json();
    return NextResponse.json(errorBody, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "invalid_error_response" },
      { status: response.status }
    );
  }
}
