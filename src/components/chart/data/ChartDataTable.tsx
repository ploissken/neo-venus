"use client";
import React from "react";
import { ChartHouse, ChartPlanet } from "@/lib/chart";
import { ChartDataItem } from "./ChartDataItem";
import { useTranslations } from "next-intl";

export interface ChartDataTableProps {
  planets: ChartPlanet[];
  ascendant?: ChartHouse;
}

export function ChartDataTable({ planets, ascendant }: ChartDataTableProps) {
  const t = useTranslations();
  return planets?.length > 0 ? (
    <>
      <h4>{t("chart.data.title")}</h4>
      {planets?.map((planet: ChartPlanet) => (
        <ChartDataItem key={planet.planetIndex} itemData={planet} />
      ))}
      {ascendant && <ChartDataItem itemData={ascendant} />}
    </>
  ) : undefined;
}
