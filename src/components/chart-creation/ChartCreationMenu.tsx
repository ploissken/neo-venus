"use client";
import { useContext } from "react";
import React from "react";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { Button, Grid } from "@mui/material";
import { ChartContext } from "@/context/ChartContext";
import { LocationPicker } from "./LocationPicker";
import { DateTimePicker } from "./DateTimePicker";

export function ChartCreationMenu() {
  const { dateValue, location, loading, setChart, setLoading } =
    useContext(ChartContext);
  const canFetchChart = dateValue && location;

  const handleCreateChart = async () => {
    if (!canFetchChart) {
      return;
    }

    setLoading(true);

    const chartData: ChartGenerationData = {
      latitude: location.latitude,
      longitude: location.longitude,
      referenceDate: dateValue,
    };

    try {
      const response = await fetch("/api/create-chart", {
        method: "POST",
        body: JSON.stringify(chartData),
      });

      const calculatedChart: Chart = await response.json();
      setChart(calculatedChart);
    } catch (err) {
      // TODO: proper handle fetch errors sitewide
      // eslint-disable-next-line no-console
      console.info(err);
    } finally {
      setLoading(false);
    }
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
      <Grid size={{ xs: 12, lg: 4 }}>
        <DateTimePicker />
      </Grid>

      <Grid size={{ xs: 12, lg: "grow" }}>
        <LocationPicker />
      </Grid>
      <Grid size={{ xs: 12, lg: 2 }}>
        <Button
          variant="contained"
          onClick={handleCreateChart}
          disabled={!canFetchChart || loading}
          loading={loading}
          size="small"
          sx={{ width: "100%", height: (theme) => theme.spacing(7) }}
        >
          Create Chart
        </Button>
      </Grid>
    </Grid>
  );
}
