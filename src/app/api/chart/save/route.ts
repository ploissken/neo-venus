import { NextRequest, NextResponse } from "next/server";
import { ChartGenerationData } from "@/lib";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { authProxyFetch, handleServerError } from "@/lib/proxy";

dayjs.extend(utc);

export async function POST(req: NextRequest) {
  const servicePath = "/chart/save";

  const requestBody: ChartGenerationData = await req.json();

  const response = await authProxyFetch(req, servicePath, {
    ...requestBody,
    referenceDate: new Date(
      dayjs(requestBody.referenceDate).utc(true).format()
    ),
  });

  if (!response.ok) {
    return await handleServerError(response);
  }

  return NextResponse.json(response);
}
