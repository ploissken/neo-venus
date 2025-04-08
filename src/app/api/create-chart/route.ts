import { ChartPlanet } from "@/lib/chart.types";
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

  const mappedPlanets: ChartPlanet[] = data.planets.map(
    ({
      planet_id,
      sign_id,
      longitude,
      degrees,
      deg_min,
      deg_sec,
    }: {
      planet_id: number;
      sign_id: number;
      longitude: number;
      degrees: number;
      deg_min: number;
      deg_sec: number;
    }) => ({
      planetIndex: planet_id,
      signIndex: sign_id,
      longitude: longitude,
      hour: degrees,
      min: deg_min,
      sec: deg_sec,
    })
  );

  return NextResponse.json({
    planets: mappedPlanets,
    asc: data.ascendant.start_degree,
  });
}
