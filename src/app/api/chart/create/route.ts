import {
  mapAspects,
  mapHouses,
  mapPlanets,
  Chart,
  ChartGenerationData,
} from "@/lib/chart";
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
    const mappedHouses = mapHouses(houses);
    const mappedPlanets = mapPlanets(planets, mappedHouses[0]?.longitude || 0);
    const mappedAspects = mapAspects(aspects);

    const chart: Chart = {
      aspects: mappedAspects,
      planets: mappedPlanets,
      houses: mappedHouses,
      asc: mappedHouses[0],
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
