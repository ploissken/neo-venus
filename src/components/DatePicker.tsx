import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";

interface MapDatePickerProps {
  onDateChange: (value: Date) => void;
  defaultValue: Date;
  defaultLabel?: string;
}

export default function DatePicker({
  onDateChange,
  defaultValue,
  defaultLabel = "Basic date picker",
}: MapDatePickerProps) {
  const handleDateChange = (value: Dayjs | null) => {
    onDateChange(new Date(value?.format() ?? ""));
  };

  return (
    <MuiDatePicker
      value={dayjs(defaultValue)}
      onChange={handleDateChange}
      label={defaultLabel}
    />
  );
}
