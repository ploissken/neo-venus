import { mapHouses, mapPlanets } from "@/lib/create-chart.helpers";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChartGenerationData } from "@/lib/chart.types";

dayjs.extend(utc);
dayjs.extend(timezone);

const SERVICE_URL = "http://localhost:8000/chart";
const TZDB_URL =
  "http://api.timezonedb.com/v2.1/get-time-zone?key=API_KEY&format=json&by=position&lat=LATITUDE&lng=LONGITUDE";

const fetchTimezone = async (
  latitude: string,
  longitude: string
): Promise<{ zoneName: string }> => {
  const tzdbGetUrl = TZDB_URL.replace("API_KEY", process.env.TZDB_API_KEY || "")
    .replace("LATITUDE", latitude)
    .replace("LONGITUDE", longitude);

  const tzResponse = await fetch(tzdbGetUrl);
  const tzData = await tzResponse.json();

  return tzData;
};

export async function POST(req: NextRequest) {
  const requestBody: ChartGenerationData = await req.json();
  const { latitude, longitude, referenceDate } = requestBody;

  const tzData = await fetchTimezone(`${latitude}`, `${longitude}`);
  const { zoneName } = tzData;

  const isoDateWithTZ = dayjs.tz(referenceDate, zoneName).toISOString();

  const response = await fetch(SERVICE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...requestBody, referenceDate: isoDateWithTZ }),
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
