"use client";
import { useContext } from "react";
import React from "react";
import { ChartPlanet } from "@/lib/chart.types";
import { ChartContext } from "@/context/ChartContext";
import { PlanetSignDegreeItem } from "./PlanetSignDegreeItem";

export function ChartDataTable() {
  const { chart } = useContext(ChartContext);

  const chartLoaded = chart?.asc?.longitude;

  return chartLoaded ? (
    <>
      <h4>Planets, Signs and Degrees</h4>
      {chart?.planets?.map((planet: ChartPlanet) => (
        <PlanetSignDegreeItem key={planet.planetIndex} chartPlanet={planet} />
      ))}
      <PlanetSignDegreeItem chartPlanet={chart?.asc} />
    </>
  ) : undefined;
}
