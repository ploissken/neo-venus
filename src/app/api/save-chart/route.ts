import { NextRequest } from "next/server";
import { ChartGenerationData } from "@/lib";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { authProxyFetch } from "@/lib/fetch.proxy";
dayjs.extend(utc);

export async function POST(req: NextRequest) {
  const servicePath = "/chart/save";

  const requestBody: ChartGenerationData = await req.json();

  return await authProxyFetch(req, servicePath, {
    ...requestBody,
    referenceDate: new Date(
      dayjs(requestBody.referenceDate).utc(true).format()
    ),
  });
}
