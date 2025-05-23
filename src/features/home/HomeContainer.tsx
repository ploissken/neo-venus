"use client";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import { ChartController } from "../create-chart/ChartController";
import { useCreateChart } from "@/hooks/useCreateChart";
import { useEffect, useState } from "react";
import { Chart } from "@/lib/chart.types";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { CHART_LARGE_SIZE } from "@/lib/chart.consts";
import { LOCATION_SERVICE_TIMEOUT } from "@/lib/location.types";
import { Refresh } from "@mui/icons-material";

export default function HomeContainer() {
  const createChart = useCreateChart();
  const { showMessage } = useSnackbar();
  const t = useTranslations();
  const [chart, setChart] = useState<Chart | undefined>();

  const handleGetLocation = () => {
    const previousChart = chart ? { ...chart } : undefined;
    setChart(undefined);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          createChart({
            referenceDate: new Date(),
            latitude,
            longitude,
          }).then((chartResult) => {
            if ("error" in chartResult) {
              showMessage(
                t(`chart.create.error.${chartResult.error}`),
                "error"
              );
            } else {
              setChart(chartResult);
            }
          });
        },
        (error) => {
          if (error.code === 1) {
            showMessage(t("location_service.error.denied"), "error");
          } else if (error.code === 2) {
            showMessage(t("location_service.error.unavailable"), "error");
          } else if (error.code === 3) {
            showMessage(t("location_service.error.timeout"), "error");
          }
          setChart(previousChart);
        },
        {
          timeout: LOCATION_SERVICE_TIMEOUT,
          maximumAge: 0,
        }
      );
    } else {
      showMessage(t("location_service.error.unavailable"), "error");
      setChart(previousChart);
    }
  };

  const handleRefresh = () => {
    setChart(undefined);
    handleGetLocation();
  };

  useEffect(() => {
    createChart({
      referenceDate: new Date(),
    }).then((chartResult) => {
      if ("error" in chartResult) {
        showMessage(t(`chart.create.error.${chartResult.error}`), "error");
      } else {
        setChart(chartResult);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      data-testid="home-container"
      container
      direction="column"
      justifyContent="center"
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        minHeight: CHART_LARGE_SIZE,
        p: 2,
        m: 2,
      })}
    >
      <Typography variant="h4" align="center">
        {t("chart.current_sky")}
        <IconButton>
          <Refresh onClick={handleRefresh} />
        </IconButton>
      </Typography>
      {chart && !chart.asc && (
        <Grid container justifyContent="center">
          <Button
            color="secondary"
            onClick={handleGetLocation}
            startIcon={<Refresh />}
          >
            {t("location_service.regenerate_chart")}
          </Button>
        </Grid>
      )}
      {chart ? (
        <ChartController chart={chart} />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          sx={{ minHeight: CHART_LARGE_SIZE }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}
