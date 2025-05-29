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
import { useEffect, useState } from "react";
import { useCreateChart, useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { Chart, CHART_LARGE_SIZE, LOCATION_SERVICE_TIMEOUT } from "@/lib/chart";
import { Refresh } from "@mui/icons-material";
import dayjs from "dayjs";

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
            date: dayjs().format("YYYY-MM-DDTHH:mm"),
            location: {
              latitude,
              longitude,
            },
          }).then((chartResult) => {
            if (!("error" in chartResult)) {
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
      referenceDate: new Date().toString(),
    }).then((chartResult) => {
      if (!("error" in chartResult)) {
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
