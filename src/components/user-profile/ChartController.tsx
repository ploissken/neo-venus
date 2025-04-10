import React from "react";
import { Grid } from "@mui/material";
import ChartView from "@/components/chart/ChartView";
import ChartDataTable from "@/components/chart/ChartDataTable";
import ChartCreationMenu from "../chart/ChartCreationMenu";

export default function ChartController() {
  return (
    <Grid container spacing={2}>
      <ChartCreationMenu />
      <Grid size={8}>
        <ChartView size={500} />
      </Grid>
      <Grid size={4} sx={{ p: 2 }}>
        <ChartDataTable />
      </Grid>
    </Grid>
  );
}
