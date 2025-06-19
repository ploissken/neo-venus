import { NextRequest, NextResponse } from "next/server";
import { handleServerError, authProxyFetch } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const servicePath = "/user/get-charts";

  const response = await authProxyFetch(req, servicePath);

  if (!response.ok) {
    return await handleServerError(response);
  }
  const charts = await response.json();
  return NextResponse.json(charts);
}
