import * as React from "react";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { FieldError } from "react-hook-form";

type DateTimePickerProps = {
  value: Dayjs | null;
  onChange: (value: dayjs.Dayjs | null) => void;
  label?: string;
  disabled?: boolean;
  error?: FieldError;
};

export function DateTimePicker({
  value,
  onChange,
  label,
  disabled,
  error,
}: DateTimePickerProps) {
  const t = useTranslations();
  const displayValue =
    value && dayjs.isDayjs(value) && value.isValid()
      ? dayjs(value.format("YYYY-MM-DDTHH:mm"))
      : null;

  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue || !dayjs.isDayjs(newValue) || !newValue.isValid()) {
      onChange(null);
      return;
    }

    const parsed = dayjs(newValue.format("YYYY-MM-DDTHH:mm"));
    onChange(parsed);
  };

  return (
    <MuiDatePicker
      value={displayValue}
      onChange={handleChange}
      label={label || t("chart.create.date")}
      disabled={disabled}
      sx={{ height: "100%", width: "100%" }}
      slotProps={{
        textField: {
          error: !!error?.message,
          helperText: error?.message,
          fullWidth: true,
        },
      }}
    />
  );
}
