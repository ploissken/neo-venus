"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import MapView from "./MapView";
import React from "react";
import DatePicker from "../../components/DatePicker";
import { buildChartPlanets } from "@/lib/chart-calculator";
import { ChartGenerationData } from "@/lib/chart.types";

export default function ChartController() {
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const chartData: ChartGenerationData = {
    // TODO: implement geolocation
    latitude: -23.3052778,
    longitude: -45.9658333,
    referenceDate: dateValue,
  };

  const chartPlanets = buildChartPlanets(chartData);

  return (
    <Stack>
      <DatePicker
        defaultValue={dateValue}
        onDateChange={setDateValue}
        defaultLabel="chart date"
      />
      <MapView chartPlanets={chartPlanets} />
    </Stack>
  );
}
