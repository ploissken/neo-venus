import { Chart } from "@/lib/chart.types";
import { ChartLocation } from "@/lib/location.types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type Optional<T> = T | undefined;
type OptionalSetter<T> = Dispatch<SetStateAction<Optional<T>>>;

export type ChartContextType = {
  chart?: Chart;
  dateValue?: Date;
  location?: ChartLocation;
  loading: boolean;
  setChart: OptionalSetter<Chart>;
  setDateValue: OptionalSetter<Date>;
  setLocation: OptionalSetter<ChartLocation>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const ChartContext = createContext<ChartContextType>({
  chart: undefined,
  dateValue: undefined,
  loading: false,
  setChart: () => {},
  setDateValue: () => {},
  setLocation: () => {},
  setLoading: () => {},
});

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [chart, setChart] = useState<Optional<Chart>>();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Optional<ChartLocation>>();
  const [dateValue, setDateValue] = useState<Optional<Date>>(new Date());

  return (
    <ChartContext.Provider
      value={{
        chart,
        setChart,
        dateValue,
        setDateValue,
        location,
        setLocation,
        loading,
        setLoading,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
