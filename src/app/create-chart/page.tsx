"use client";
import { ChartProvider } from "@/context/ChartContext";
import CreateChartContainer from "@/features/create-chart/CreateChartContainer";

export default function CreateChart() {
  return (
    <ChartProvider>
      <CreateChartContainer />
    </ChartProvider>
  );
}
