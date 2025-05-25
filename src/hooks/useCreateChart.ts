import { Chart, ChartGenerationData } from "@/lib/chart";
import { useCallback } from "react";
import { useFetch } from "./useFetch";

export const useCreateChart = () => {
  const { anonFetch } = useFetch();

  const handleCreateChart = useCallback(
    async (chartData: ChartGenerationData) => {
      const fetchResponse = await anonFetch<{ chart: Chart }>(
        "/api/chart/create",
        {
          method: "POST",
          body: JSON.stringify(chartData),
        }
      );
      if (fetchResponse.ok) {
        return fetchResponse.data.chart;
      } else {
        return fetchResponse;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return handleCreateChart;
};
