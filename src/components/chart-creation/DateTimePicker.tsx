import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { ChartContext } from "@/context/ChartContext";
import { useContext } from "react";
import { useTranslations } from "next-intl";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface MapDateTimePickerProps {
  defaultLabel?: string;
}

export function DateTimePicker({ defaultLabel }: MapDateTimePickerProps) {
  const t = useTranslations();
  const { loading, setDateValue } = useContext(ChartContext);

  const handleDateChange = (value: Dayjs | null) => {
    setDateValue(new Date(dayjs(value).utc(true).format()));
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
