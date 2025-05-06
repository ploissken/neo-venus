import { CreateChartResponse } from "@/lib/create-chart.helpers";
import { ChartGenerationData } from "@/lib/chart.types";
import { useCallback } from "react";

export const useCreateChart = () => {
  const handleCreateChart = useCallback(
    async (chartData: ChartGenerationData) => {
      const fetchResponse = await fetch("/api/create-chart", {
        method: "POST",
        body: JSON.stringify(chartData),
      });

      const response: CreateChartResponse = await fetchResponse.json();

      if (response.ok) {
        return response.data.chart;
      } else {
        return response;
      }
    },
    []
  );

  return handleCreateChart;
};
