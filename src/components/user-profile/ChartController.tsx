"use client";
import { useContext, useState } from "react";
import React from "react";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { Grid, Box, Button } from "@mui/material";
import { ChartContext } from "@/context/ChartContext";
import LocationPicker from "@/components/LocationPicker";
import DatePicker from "@/components/DatePicker";
import ChartView from "@/components/chart/ChartView";
import ChartDataTable from "@/components/chart/ChartDataTable";

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
    <Grid container spacing={2}>
      <Grid size={12} sx={{ backgroundColor: "purple" }}>
        <Box>
          <DatePicker
            defaultValue={dateValue}
            onDateChange={setDateValue}
            defaultLabel="chart date"
          />
          <LocationPicker />
          <Button variant="contained" onClick={handleCreateChart}>
            Create Chart
          </Button>
        </Box>
      </Grid>
      <Grid size={8}>
        <ChartView size={500} />
      </Grid>
      <Grid size={4} sx={{ p: 2 }}>
        <ChartDataTable />
      </Grid>
    </Grid>
  );
}
