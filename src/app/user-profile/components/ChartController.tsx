"use client";
import { useState } from "react";
import MapView from "./MapView";
import React from "react";
import DatePicker from "../../components/DatePicker";
import { ChartGenerationData, ChartPlanet } from "@/lib/chart.types";
import { Grid, Box, Button } from "@mui/material";
import PlanetSignDegree from "./PlanetSignDegree";

export default function ChartController() {
  const [dateValue, setDateValue] = useState<Date>(
    new Date("1986-12-27T09:35:00")
  );
  const [chartPlanets, setChartPlanets] = useState<ChartPlanet[]>([]);
  const [ascendant, setAscendant] = useState(0);

  const chartData: ChartGenerationData = {
    // TODO: implement geolocation
    latitude: -23.3052778,
    longitude: -45.9658333,
    referenceDate: dateValue,
  };

  const handleCreateChart = async () => {
    const resp = await fetch("/api/create-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    });
    const data = await resp.json();
    console.log("got planets data", data);

    setChartPlanets(data.planets);
    setAscendant(data.asc);
  };

  return (
    <Grid container alignItems="flex-end" spacing={2}>
      <Grid size={8}>
        <Box sx={{ backgroundColor: "#222" }}>
          <DatePicker
            defaultValue={dateValue}
            onDateChange={setDateValue}
            defaultLabel="chart date"
          />
          <Button variant="contained" onClick={handleCreateChart}>
            Create
          </Button>
          {chartPlanets.length > 0 && (
            <MapView chartPlanets={chartPlanets} ascendant={ascendant} />
          )}
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
