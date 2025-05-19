import { DateTimePicker, LocationPicker } from "@/components/chart-creation";
import { ChartLocation, ProfileFormFields } from "@/lib";
import { Button, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);
export type ChartFormInputs = {
  date: string;
  time: string;
  location: ChartLocation;
};

export type ChartFormProps = {
  onChartDataReady: ({
    location,
    date,
  }: {
    location: ChartLocation;
    date: string;
  }) => void;
};

export function ChartForm({ onChartDataReady }: ChartFormProps) {
  const { handleSubmit, control } = useForm<ChartFormInputs>({
    mode: "onChange",
  });
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ChartFormInputs> = (data) => {
    setLoading(true);
    onChartDataReady({ location, date: dayjs(data.date).utc(true).format() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        data-testid="chart-step-form"
        container
        size={12}
        direction="column"
        sx={{ gap: 2 }}
      >
        <Controller
          name={ProfileFormFields.Date}
          control={control}
          render={({ field, fieldState }) => (
            <DateTimePicker
              value={field.value ? dayjs(field.value).utc(true) : null}
              onChange={(newValue) => field.onChange(newValue)}
              error={fieldState.error}
            />
          )}
          rules={{
            required: t("form.chart.date.required"),
          }}
        />

        <Controller
          name={ProfileFormFields.Location}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <LocationPicker
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            );
          }}
          rules={{
            required: t("form.chart.location.required"),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          disabled={loading}
        >
          {t("form.chart.generate")}
        </Button>
      </Grid>
    </form>
  );
}
