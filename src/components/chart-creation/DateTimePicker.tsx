import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import utc from "dayjs/plugin/utc";
import { FieldError } from "react-hook-form";

dayjs.extend(utc);

interface ControlledProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

interface UncontrolledProps {
  defaultValue?: Dayjs | null;
  onDateChanged?: (date?: Date) => void;
}

interface BaseProps {
  defaultLabel?: string;
  disabled?: boolean;
  error?: FieldError;
}

type DateTimePickerProps = BaseProps & (ControlledProps | UncontrolledProps);

export function DateTimePicker(props: DateTimePickerProps) {
  const t = useTranslations();
  const isControlled = "value" in props;

  const [internalValue, setInternalValue] = useState<Dayjs | null>(
    "defaultValue" in props ? props.defaultValue ?? null : null
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(props.value);
    }
  }, [props, isControlled]);

  const handleChange = (newValue: Dayjs | null) => {
    if (isControlled) {
      props.onChange(dayjs(newValue).utc(true));
    } else {
      setInternalValue(newValue);
      props.onDateChanged?.(
        newValue ? new Date(dayjs(newValue).utc(true).format()) : undefined
      );
    }
  };

  return (
    <MuiDatePicker
      value={isControlled ? props.value : internalValue}
      onChange={handleChange}
      label={props.defaultLabel || t("chart.create.date")}
      disabled={props.disabled}
      sx={{ height: "100%", width: "100%" }}
      slotProps={{
        textField: {
          error: !!props.error?.message,
          helperText: props.error?.message,
          fullWidth: true,
        },
      }}
    />
  );
}
