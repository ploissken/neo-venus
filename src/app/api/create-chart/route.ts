import { mapHouses, mapPlanets } from "@/lib/create-chart.helpers";
import { NextRequest, NextResponse } from "next/server";

const SERVICE_URL = "http://localhost:8000/chart";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  const response = await fetch(SERVICE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }

  const data = await response.json();
  const { planets, houses, metadata, aspects } = data;

  const mappedPlanets = mapPlanets(planets);
  const mappedHouses = mapHouses(houses);

  return NextResponse.json({
    aspects,
    metadata,
    planets: mappedPlanets,
    houses: mappedHouses,
    asc: mappedHouses[0],
  });
}
