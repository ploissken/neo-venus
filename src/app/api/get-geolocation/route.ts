import { anonProxyFetch } from "@/lib/fetch.proxy";
import { ChartLocation } from "@/lib/location.types";
import { NextRequest, NextResponse } from "next/server";

const buildLocationServiceUrl = (city: string) => {
  const serviceUrl =
    "https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2";
  return `${serviceUrl}&q=${city}`;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");

  if (!city) {
    return NextResponse.json({
      ok: false,
      error: "no_city_provided",
    });
  }

  const response = await anonProxyFetch(req, buildLocationServiceUrl(city));
  if (!response.ok) {
    return NextResponse.json(response);
  }

  const responseJson = await response.json();

  const locations: ChartLocation[] = responseJson.map(
    ({ lat, lon, name, display_name }: { [key: string]: string }) => ({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
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
