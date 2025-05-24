import { mapAspects, mapHouses, mapPlanets } from "@/lib/create-chart.helpers";
import { NextRequest, NextResponse } from "next/server";
import { Chart, ChartGenerationData } from "@/lib";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { anonProxyFetch } from "@/lib/fetch.proxy";
dayjs.extend(utc);

export async function POST(req: NextRequest) {
  const servicePath = "/chart/create";

  const requestBody: ChartGenerationData = await req.json();

  const response = await anonProxyFetch(req, servicePath, {
    ...requestBody,
    referenceDate: new Date(
      dayjs(requestBody.referenceDate).utc(true).format()
    ),
  });

  if (!response.ok) {
    return NextResponse.json(response);
  }

  try {
    const { planets, houses, metadata, aspects } = await response.json();
    // const repsonseJson = await response.json();
    // console.log("datadatadata", repsonseJson);
    // return {};

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
      chart,
      metadata,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: `chart_parse_error`,
    });
  }
}
