import { DateTimePicker, LocationPicker } from "@/components/chart-creation";
import { ChartLocation } from "@/lib";
import { Button, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import dayjs from "dayjs";

export type ChartFormInputs = {
  date: string;
  location: ChartLocation;
};

export const ChartFormFields = {
  Date: "date",
  Location: "location",
} as const;

export type ChartFormProps = {
  onChartDataReady: (chartData: ChartFormInputs) => void;
  displayStyle?: "row" | "column";
  loading?: boolean;
  disabled?: boolean;
  onLocationsLoaded?: (locations: ChartLocation[]) => void;
  startingLocations?: ChartLocation[];
  chartData?: {
    date: string;
    location: ChartLocation;
  };
};

export function ChartForm({
  onChartDataReady,
  displayStyle = "column",
  loading,
  disabled,
  chartData,
  startingLocations,
  onLocationsLoaded,
}: ChartFormProps) {
  const { handleSubmit, control } = useForm<ChartFormInputs>({
    mode: "onChange",
    defaultValues: {
      [ChartFormFields.Date]: chartData?.date,
      [ChartFormFields.Location]: chartData?.location,
    },
  });
  const t = useTranslations();

  const onSubmit: SubmitHandler<ChartFormInputs> = (data) => {
    onChartDataReady(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ width: "100%" }}
    >
      <Grid
        data-testid="chart-step-form"
        container
        size={12}
        direction={displayStyle}
        sx={{ gap: 2 }}
      >
        <Grid container size={displayStyle === "row" ? { xs: 12, lg: 4 } : 12}>
          <Controller
            name={ChartFormFields.Date}
            control={control}
            render={({ field, fieldState }) => (
              <DateTimePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) =>
                  field.onChange(dayjs(newValue).format("YYYY-MM-DDTHH:mm"))
                }
                error={fieldState.error}
              />
            )}
            rules={{
              required: t("form.chart.date.required"),
            }}
          />
        </Grid>

        <Grid container size={displayStyle === "row" ? { xs: 12, lg: 4 } : 12}>
          <Controller
            name={ChartFormFields.Location}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <LocationPicker
                  value={field.value}
                  onChange={field.onChange}
                  onLocationsLoaded={onLocationsLoaded}
                  startingLocations={startingLocations}
                  error={fieldState.error}
                />
              );
            }}
            rules={{
              required: t("form.chart.location.required"),
            }}
          />
        </Grid>
        <Grid
          container
          direction="column"
          size={displayStyle === "row" ? { xs: 12, lg: "grow" } : 12}
        >
          <Button
            type="submit"
            variant="contained"
            loading={loading}
            disabled={disabled}
            sx={{ height: (theme) => theme.spacing(7) }}
          >
            {t("form.chart.generate")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
