import { BackendErrorResponse } from "@/lib";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { useCallback } from "react";

export const useCreateChart = () => {
  const handleCreateChart = useCallback(
    async (chartData: ChartGenerationData) => {
      const fetchResponse = await fetch("/api/create-chart", {
        method: "POST",
        body: JSON.stringify(chartData),
      });

      const response: { chart: Chart } | BackendErrorResponse =
        await fetchResponse.json();

      if ("chart" in response) {
        return response.chart;
      } else {
        return response;
      }
    },
    []
  );

  return handleCreateChart;
};
