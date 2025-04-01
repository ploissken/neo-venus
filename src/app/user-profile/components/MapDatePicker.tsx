"use client";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export default function MapDatePicker() {
  const [dateValue, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <DatePicker
      value={dateValue}
      onChange={(newValue) => setValue(newValue)}
      label="Basic date picker"
    />
  );
}
