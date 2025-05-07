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
  dateValue?: Date;
  location?: ChartLocation;
  loading: boolean;
  setDateValue: OptionalSetter<Date>;
  setLocation: OptionalSetter<ChartLocation>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const ChartContext = createContext<ChartContextType>({
  dateValue: undefined,
  loading: false,
  location: undefined,
  setDateValue: () => {},
  setLocation: () => {},
  setLoading: () => {},
});

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Optional<ChartLocation>>();
  const [dateValue, setDateValue] = useState<Optional<Date>>();

  return (
    <ChartContext.Provider
      value={{
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
