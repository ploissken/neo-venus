import { DateTimePicker, LocationPicker } from "@/components/chart/creation";
import { ChartLocation } from "@/lib/chart";
import { Button, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import dayjs from "dayjs";

export type ChartFormInputs = {
  name: string;
  date: string;
  location: ChartLocation;
};

export const ChartFormFields = {
  Date: "date",
  Location: "location",
  Name: "name",
} as const;

export type ChartFormProps = {
  onChartDataReady: (chartData: ChartFormInputs) => void;
  hideNameField?: boolean;
  displayStyle?: "row" | "column";
  loading?: boolean;
  disabled?: boolean;
  onLocationsLoaded?: (locations: ChartLocation[]) => void;
  startingLocations?: ChartLocation[];
  chartData?: {
    date: string;
    location: ChartLocation;
    name?: string;
  };
};

export function ChartForm({
  onChartDataReady,
  displayStyle = "column",
  hideNameField = false,
  loading,
  disabled,
  chartData,
  startingLocations,
  onLocationsLoaded,
}: ChartFormProps) {
  const t = useTranslations();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ChartFormInputs>({
    mode: "onChange",
    defaultValues: {
      [ChartFormFields.Name]: hideNameField
        ? t("form.chart.my_chart")
        : chartData?.name,
      [ChartFormFields.Date]: chartData?.date,
      [ChartFormFields.Location]: chartData?.location,
    },
  });

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
        {!hideNameField && (
          <Grid
            container
            size={displayStyle === "row" ? { xs: 12, lg: 4 } : 12}
          >
            <TextField
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              id="chartName"
              label={t("form.chart.name.label")}
              variant="outlined"
              {...register(ChartFormFields.Name, {
                required: t("form.chart.name.required"),
              })}
            />
          </Grid>
        )}

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
