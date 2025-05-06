import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { ChartContext } from "@/context/ChartContext";
import { useContext } from "react";
import { useTranslations } from "next-intl";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface MapDateTimePickerProps {
  onDateChanged: (date?: Date) => void;
  defaultLabel?: string;
}

export function DateTimePicker({
  defaultLabel,
  onDateChanged,
}: MapDateTimePickerProps) {
  const t = useTranslations();
  const { loading } = useContext(ChartContext);

  const handleDateChange = (value: Dayjs | null) => {
    onDateChanged(new Date(dayjs(value).utc(true).format()));
  };

  return (
    <MuiDatePicker
      onChange={handleDateChange}
      label={defaultLabel || t("chart.create.date")}
      disabled={loading}
      sx={{ height: "100%", width: "100%" }}
    />
  );
}
