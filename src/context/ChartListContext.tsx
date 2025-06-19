import { Chart } from "@/lib/chart";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ChartListContextType {
  chartList: Chart[];
  setChartList: Dispatch<SetStateAction<Chart[]>>;
  addChart: (chart: Chart) => void;
  currentChart: Chart | undefined;
  setCurrentChart: Dispatch<SetStateAction<Chart | undefined>>;
}

const ChartListContext = createContext<ChartListContextType | undefined>(
  undefined
);

export function ChartListProvider({ children }: { children: ReactNode }) {
  const [chartList, setChartList] = useState<Chart[]>([]);
  const [currentChart, setCurrentChart] = useState<Chart | undefined>();

  const addChart = (chart: Chart) => {
    setChartList([...chartList, chart]);
    setCurrentChart(chart);
  };

  return (
    <ChartListContext.Provider
      value={{
        chartList,
        setChartList,
        addChart,
        setCurrentChart,
        currentChart,
      }}
    >
      {children}
    </ChartListContext.Provider>
  );
}

export function useChartList() {
  const context = useContext(ChartListContext);
  if (!context)
    throw new Error("useChartList must be used within an ChartListProvider");
  return context;
}
