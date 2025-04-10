import { Chart } from "@/lib/chart.types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const DEFAULT_CHART: Chart = {
  planets: [],
  houses: [],
  asc: undefined,
};

export type ChartContextType = {
  chart: Chart;
  setChart: Dispatch<SetStateAction<Chart>>;
};

export const ChartContext = createContext<ChartContextType>({
  chart: DEFAULT_CHART,
  setChart: () => {},
});

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [chart, setChart] = useState<Chart>(DEFAULT_CHART);

  return (
    <ChartContext.Provider value={{ chart, setChart }}>
      {children}
    </ChartContext.Provider>
  );
};
