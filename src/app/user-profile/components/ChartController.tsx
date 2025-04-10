"use client";
import { useContext, useState } from "react";
import MapView from "./MapView";
import React from "react";
import DatePicker from "../../components/DatePicker";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { Grid, Box, Button } from "@mui/material";
import { ChartContext } from "@/app/context/ChartContext";
import ChartDataTable from "./ChartDataTable";

export default function ChartController() {
  const [dateValue, setDateValue] = useState<Date>(
    new Date("1986-12-27T09:35:00")
  );
  const { setChart } = useContext(ChartContext);

  const chartData: ChartGenerationData = {
    // TODO: implement geolocation
    latitude: -23.3052778,
    longitude: -45.9658333,
    referenceDate: dateValue,
  };

  const handleCreateChart = async () => {
    const response = await fetch("/api/create-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    });
    const calculatedChart: Chart = await response.json();
    setChart(calculatedChart);
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
          <MapView size={500} />
        </Box>
      </Grid>
      <Grid size={4} sx={{ p: 2 }}>
        <ChartDataTable />
      </Grid>
    </Grid>
  );
}
