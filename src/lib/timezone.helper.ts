import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChartGenerationData } from "./chart.types";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZDB_URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${
  process.env.TZDB_API_KEY || ""
}&format=json&by=position&lat=LATITUDE&lng=LONGITUDE`;

export const getISODateWithTimezone = async ({
  latitude,
  longitude,
  referenceDate,
}: ChartGenerationData): Promise<
  { ok: true; data: string } | { ok: false; error: string }
> => {
  const tzdbGetUrl = TZDB_URL.replace("LATITUDE", `${latitude}`).replace(
    "LONGITUDE",
    `${longitude}`
  );

  try {
    const tzResponse = await fetch(tzdbGetUrl);
    if (!tzResponse.ok) {
      return {
        ok: false,
        error: `Failed to fetch timezone. Status: ${tzResponse.status}`,
      };
    }
    const tzData = await tzResponse.json();
    const { zoneName } = tzData;

    const isoDateWithTZ = dayjs.tz(referenceDate, zoneName).toISOString();
    return { ok: true, data: isoDateWithTZ };
  } catch (error) {
    return {
      ok: false,
      error: `Failed to fetch timezone. (${(error as Error).message})`,
    };
  }
};
