"use client";
import { useContext } from "react";
import React from "react";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { Button, Grid } from "@mui/material";
import { ChartContext } from "@/context/ChartContext";
import LocationPicker from "@/components/LocationPicker";
import DatePicker from "@/components/DatePicker";

export default function ChartCreationMenu() {
  const { dateValue, location, setChart } = useContext(ChartContext);
  const canFetchChart = dateValue && location;

  const handleCreateChart = async () => {
    if (!canFetchChart) return;

    const chartData: ChartGenerationData = {
      latitude: location.latitude,
      longitude: location.longitude,
      referenceDate: dateValue,
    };

    const response = await fetch("/api/create-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    });

    const calculatedChart: Chart = await response.json();
    setChart(calculatedChart);
  };

  return (
    <Grid
      container
      size={12}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Grid size={4}>
        <DatePicker />
      </Grid>

      <Grid size="grow">
        <LocationPicker />
      </Grid>
      <Grid size={2}>
        <Button
          variant="contained"
          onClick={handleCreateChart}
          disabled={!canFetchChart}
          size="small"
          sx={{ height: "100%", width: "100%" }}
        >
          Create Chart
        </Button>
      </Grid>
    </Grid>
  );
}
