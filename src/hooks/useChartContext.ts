import { ChartContext, ChartContextType } from "@/context/ChartContext";
import { useContext } from "react";

export const useChartContext = (): ChartContextType => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider");
  }
  return context;
};
