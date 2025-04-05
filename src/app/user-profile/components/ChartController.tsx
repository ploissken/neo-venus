"use client";
import { useState } from "react";
import MapView from "./MapView";
import React from "react";
import DatePicker from "../../components/DatePicker";
import { buildChartPlanets } from "@/lib/chart-calculator";
import { ChartGenerationData } from "@/lib/chart.types";
import { Grid, Box } from "@mui/material";
import PlanetSignDegree from "./PlanetSignDegree";

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
    <Grid container alignItems="flex-end" spacing={2}>
      <Grid size={8}>
        <Box sx={{ backgroundColor: "#222" }}>
          <DatePicker
            defaultValue={dateValue}
            onDateChange={setDateValue}
            defaultLabel="chart date"
          />
          <MapView chartPlanets={chartPlanets} />
        </Box>
      </Grid>
      <Grid size={4} sx={{ p: 2 }}>
        <h4>Planets, Signs and Degrees</h4>
        {chartPlanets.map((planet) => (
          <PlanetSignDegree key={planet.planetIndex} chartPlanet={planet} />
        ))}
      </Grid>
    </Grid>
  );
}
