import { ChartHouse, ChartPlanet } from "@/lib/chart.types";
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
  const { planets, ascendant, houses } = data;

  const mappedPlanets: ChartPlanet[] = planets.map(
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

  const mappedHouses: ChartHouse[] = houses.map(
    ({
      house,
      start_degree,
      sign_id,
      degrees,
      deg_min,
      deg_sec,
    }: {
      house: number;
      start_degree: number;
      sign_id: number;
      degrees: number;
      deg_min: number;
      deg_sec: number;
    }) => ({
      houseIndex: house,
      longitude: start_degree,
      signIndex: sign_id,
      hour: degrees,
      min: deg_min,
      sec: deg_sec,
    })
  );

  return NextResponse.json({
    planets: mappedPlanets,
    houses: mappedHouses,
    asc: {
      signIndex: ascendant.sign_id,
      longitude: ascendant.start_degree,
      hour: ascendant.degrees,
      min: ascendant.deg_min,
      sec: ascendant.deg_sec,
    },
  });
}
