import { ChartLocation } from "@/lib/location.types";
import { NextRequest, NextResponse } from "next/server";

const SERVICE_URL =
  "https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2";

const createServiceURL = (city: string) => {
  return `${SERVICE_URL}&q=${city}`;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");

  if (!city) {
    throw new Error("no city provided");
  }

  const response = await fetch(createServiceURL(city), {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  const responseJson = await response.json();

  const locations: ChartLocation[] = responseJson.map(
    ({ lat, lon, name, display_name }: { [key: string]: string }) => ({
      latitude: parseInt(lat),
      longitude: parseInt(lon),
      name: name,
      displayName:
        display_name.length > 50
          ? `${display_name.slice(0, 50)}...`
          : display_name,
    })
  );

  return NextResponse.json({
    locations,
  });
}
