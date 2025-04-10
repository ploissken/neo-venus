"use client";
import { useContext } from "react";
import React from "react";
import { ChartPlanet } from "@/lib/chart.types";
import PlanetSignDegreeItem from "./PlanetSignDegreeItem";
import { ChartContext } from "@/app/context/ChartContext";

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
