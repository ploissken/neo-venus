"use client";
import React from "react";
import { ChartHouse, ChartPlanet } from "@/lib/chart.types";
import { PlanetSignDegreeItem } from "./PlanetSignDegreeItem";

export interface ChartDataTableProps {
  planets: ChartPlanet[];
  ascendant?: ChartHouse;
}

export function ChartDataTable({ planets, ascendant }: ChartDataTableProps) {
  return planets?.length > 0 ? (
    <>
      <h4>Planets, Signs and Degrees</h4>
      {planets?.map((planet: ChartPlanet) => (
        <PlanetSignDegreeItem key={planet.planetIndex} chartPlanet={planet} />
      ))}
      {ascendant && <PlanetSignDegreeItem chartPlanet={ascendant} />}
    </>
  ) : undefined;
}
