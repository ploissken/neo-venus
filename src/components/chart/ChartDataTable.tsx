"use client";
import { useContext } from "react";
import React from "react";
import { ChartPlanet } from "@/lib/chart.types";
import { ChartContext } from "@/context/ChartContext";
import PlanetSignDegreeItem from "./PlanetSignDegreeItem";

export default function ChartDataTable() {
  const {
    chart: { planets, asc },
  } = useContext(ChartContext);

  const chartLoaded = asc?.longitude;

  return chartLoaded ? (
    <>
      <h4>Planets, Signs and Degrees</h4>
      {planets?.map((planet: ChartPlanet) => (
        <PlanetSignDegreeItem key={planet.planetIndex} chartPlanet={planet} />
      ))}
      <PlanetSignDegreeItem chartPlanet={asc} />
    </>
  ) : undefined;
}
