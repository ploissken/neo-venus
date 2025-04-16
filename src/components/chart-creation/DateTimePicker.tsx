import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { ChartContext } from "@/context/ChartContext";
import { useContext, useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface MapDateTimePickerProps {
  defaultLabel?: string;
}

export function DateTimePicker({
  defaultLabel = "Chart Date",
}: MapDateTimePickerProps) {
  const [componentDate, setComponentDate] = useState<Dayjs | null>();
  const { loading, setDateValue } = useContext(ChartContext);

  const handleDateChange = (value: Dayjs | null) => {
    setComponentDate(value);
    setDateValue(new Date(dayjs(value).utc(true).format()));
  };

  return (
    <MuiDatePicker
      value={dayjs(componentDate)}
      onChange={handleDateChange}
      label={defaultLabel}
      disabled={loading}
      sx={{ height: "100%", width: "100%" }}
    />
  );
}
