import { mapAspects, mapHouses, mapPlanets } from "@/lib/create-chart.helpers";
import { NextRequest, NextResponse } from "next/server";
import { Chart, ChartGenerationData } from "@/lib/chart.types";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/chart/create";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const requestBody: ChartGenerationData = await req.json();

  try {
    const response = await fetch(`${BASE_URL}${SERVICE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...requestBody,
      }),
    });

    const data = await response.json();
    const { planets, houses, metadata, aspects } = data;

    const mappedHouses = mapHouses(houses);
    const mappedPlanets = mapPlanets(planets, mappedHouses[0]?.longitude || 0);
    const mappedAspects = mapAspects(aspects);

    const chart: Chart = {
      aspects: mappedAspects,
      planets: mappedPlanets,
      houses: mappedHouses,
      asc: mappedHouses[0],
    };

    return NextResponse.json({
      ok: true,
      data: { chart, metadata },
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: `chart_fetch_error`,
    });
  }
}
