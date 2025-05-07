"use client";
import React from "react";
import { ChartHouse, ChartPlanet } from "@/lib/chart.types";
import { ChartDataItem } from "./ChartDataItem";

export interface ChartDataTableProps {
  planets: ChartPlanet[];
  ascendant?: ChartHouse;
}

export function ChartDataTable({ planets, ascendant }: ChartDataTableProps) {
  return planets?.length > 0 ? (
    <>
      <h4>Planets, Signs and Degrees</h4>
      {planets?.map((planet: ChartPlanet) => (
        <ChartDataItem key={planet.planetIndex} itemData={planet} />
      ))}
      {ascendant && <ChartDataItem itemData={ascendant} />}
    </>
  ) : undefined;
}
