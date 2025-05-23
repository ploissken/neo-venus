import { NextRequest, NextResponse } from "next/server";
import { ChartGenerationData } from "@/lib";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { cookies } from "next/headers";
dayjs.extend(utc);

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.API_BASE_URL;
  const SERVICE_PATH = "/chart/save";

  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const requestBody: ChartGenerationData = await req.json();

  // TODO: add authFetch middleware
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  try {
    const response = await fetch(`${BASE_URL}${SERVICE_PATH}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token?.value}`,
      },
      body: JSON.stringify({
        ...requestBody,
        referenceDate: new Date(
          dayjs(requestBody.referenceDate).utc(true).format()
        ),
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: `chart_fetch_error`,
    });
  }
}
