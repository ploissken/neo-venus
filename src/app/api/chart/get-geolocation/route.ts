import { handleServerError, anonProxyFetch } from "@/lib/proxy";
import { ChartLocation } from "@/lib/chart";
import { NextRequest, NextResponse } from "next/server";

const buildLocationServiceUrl = (city: string) => {
  const serviceUrl =
    "https://nominatim.openstreetmap.org/search?polygon_geojson=1&format=jsonv2&addressdetails=1";
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
    return await handleServerError(response);
  }

  const responseJson = await response.json();

  const locations: ChartLocation[] = responseJson.map(
    ({
      lat,
      lon,
      name,
      address,
    }: {
      name: string;
      lat: string;
      lon: string;
      address: { state: string; country: string; country_code: string };
    }) => {
      const { state, country, country_code } = address;
      const displayName = [name, state, country].join(", ");
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: name,
        details: {
          countryCode: country_code.toUpperCase(),
          country,
          state,
        },
        displayName:
          displayName.length > 50
            ? `${displayName.slice(0, 50)}...`
            : displayName,
      };
    }
  );

  return NextResponse.json({
    locations,
  });
}
