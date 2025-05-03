import { useChartContext } from "./useChartContext";
import { useSnackbar } from "./useSnackbar";
import { useTranslations } from "next-intl";
import { CreateChartResponse } from "@/lib/create-chart.helpers";

export const useCreateChart = () => {
  const { dateValue, location, setChart, setLoading } = useChartContext();
  const { showMessage } = useSnackbar();
  const t = useTranslations();

  return async function handleCreateChart() {
    setLoading(true);

    const chartData = {
      latitude: location?.latitude,
      longitude: location?.longitude,
      referenceDate: dateValue,
    };

    const fetchResponse = await fetch("/api/create-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    });

    const response: CreateChartResponse = await fetchResponse.json();

    if (!response.ok) {
      showMessage(t(`chart.create.error.${response.error}`), "error");
    } else {
      setChart(response.data.chart);
    }

    setLoading(false);
  };
};
