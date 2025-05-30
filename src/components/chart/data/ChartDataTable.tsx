"use client";
import React from "react";
import { ChartHouse, ChartPlanet } from "@/lib/chart";
import { ChartDataItem } from "./ChartDataItem";
import { useTranslations } from "next-intl";
import { Grid, Typography } from "@mui/material";

export interface ChartDataTableProps {
  planets: ChartPlanet[];
  ascendant?: ChartHouse;
}

export function ChartDataTable({ planets, ascendant }: ChartDataTableProps) {
  const t = useTranslations();
  return planets?.length > 0 ? (
    <Grid size={12}>
      <Typography variant="h6">{t(`chart.data.title`)}</Typography>
      {planets?.map((planet: ChartPlanet) => (
        <ChartDataItem key={planet.planetIndex} itemData={planet} />
      ))}
      {ascendant && <ChartDataItem itemData={ascendant} />}
    </Grid>
  ) : undefined;
}
