import { mapAspects, mapHouses, mapPlanets } from "@/lib/create-chart.helpers";
import { NextRequest, NextResponse } from "next/server";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { getISODateWithTimezone } from "@/lib/timezone.helper";

const SERVICE_URL =
  process.env.NODE_ENV === "production"
    ? "https://be-merc.txto.com.br/chart/create"
    : "http://localhost:8888/chart/create";

export async function POST(req: NextRequest) {
  const requestBody: ChartGenerationData = await req.json();
  const isoDateWithTZ = await getISODateWithTimezone(requestBody);

  if (!isoDateWithTZ.ok) {
    return NextResponse.json(isoDateWithTZ);
  }

  try {
    const response = await fetch(SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...requestBody,
        referenceDate: isoDateWithTZ.data,
      }),
    });

    const data = await response.json();
    const { planets, houses, metadata, aspects } = data;

    const mappedHouses = mapHouses(houses);
    const mappedPlanets = mapPlanets(planets, mappedHouses[0].longitude);
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
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: `Failed to fetch chart data. (${(err as Error).message})`,
    });
  }
}
