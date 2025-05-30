import { Chart, ChartGenerationData } from "@/lib/chart";
import { NextRequest, NextResponse } from "next/server";
import { handleServerError, anonProxyFetch } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  const servicePath = "/chart/create";

  const requestBody: ChartGenerationData = await req.json();

  const response = await anonProxyFetch(req, servicePath, requestBody);

  if (!response.ok) {
    return await handleServerError(response);
  }

  try {
    const { planets, houses, metadata, aspects } = await response.json();

    const chart: Chart = {
      aspects,
      planets,
      houses,
      asc: houses[0],
      metadata,
    };

    return NextResponse.json({
      chart,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: `chart_parse_error`,
    });
  }
}
