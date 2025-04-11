import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { ChartContext } from "@/context/ChartContext";
import { useContext } from "react";

interface MapDatePickerProps {
  defaultLabel?: string;
}

export default function DatePicker({
  defaultLabel = "Chart Date",
}: MapDatePickerProps) {
  const { dateValue, setDateValue } = useContext(ChartContext);

  const handleDateChange = (value: Dayjs | null) => {
    setDateValue(new Date(value?.format() ?? ""));
  };

  return (
    <MuiDatePicker
      value={dayjs(dateValue)}
      onChange={handleDateChange}
      label={defaultLabel}
      sx={{ height: "100%", width: "100%" }}
    />
  );
}
