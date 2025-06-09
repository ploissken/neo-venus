import React from "react";
import { Fab, Grid } from "@mui/material";
import { Chart } from "@/lib/chart";
import { ChartDataTable, ChartAspectsTable } from "@/components/chart/data";
import AstralChart from "@/components/chart/drawings/AstralChart";
import { ChartMetadataTable } from "@/components/chart/data/ChartMetadataTable";
import { ChartElementsTable } from "@/components/chart/data/ChartElementsTable";
import { Add } from "@mui/icons-material";

export function ChartView({ chart }: { chart: Chart }) {
  return (
    <>
      <Grid
        container
        size={12}
        justifyContent="space-between"
        padding={2}
        gap={2}
      >
        <Grid container size={12} sx={{ gap: 4 }}>
          <ChartMetadataTable metadata={chart.metadata} />
          <ChartElementsTable elements={chart.elements} />
        </Grid>
        <Grid container size={12} justifyContent="center">
          <AstralChart chart={chart} />
        </Grid>
        <Grid container size={{ md: 12, lg: 5 }}>
          <ChartDataTable planets={chart.planets} ascendant={chart.asc} />
        </Grid>
        <Grid container size={{ md: 12, lg: 6 }}>
          <ChartAspectsTable aspects={chart.aspects} />
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "16px", right: "16px" }}
      >
        <Add />
      </Fab>
    </>
  );
}
