"use client";
import { useFetch } from "@/hooks";
import { Chart } from "@/lib/chart";
import { useEffect, useState } from "react";
import ChartListItem from "./ChartListItem";
import { Grid, IconButton, List, useMediaQuery } from "@mui/material";
import { ChartView } from "./ChartView";
import { AddChartDialog } from "./AddChartDialog";
import { useChartList } from "@/context/ChartListContext";
import theme from "@/theme";
import { ArrowBack } from "@mui/icons-material";

export default function ChartListContainer() {
  const { authFetch } = useFetch();
  const [reloading, setReloading] = useState(false);
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(!isMediumScreen);
  const { chartList, setChartList, currentChart, setCurrentChart } =
    useChartList();

  useEffect(() => {
    if (chartList.length === 0) {
      authFetch<Chart[]>(`/api/user/get-charts`).then((response) => {
        if (!("error" in response)) {
          const { data } = response;
          setChartList(data);
          if (data.length > 0) {
            setCurrentChart(data[0]);
          }
        }
      });
    } else {
      setCurrentChart(chartList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartOptions = (
    <List component="nav">
      {chartList.map((chart) => (
        <ChartListItem
          key={chart.id}
          selectedId={currentChart?.id}
          chart={chart}
          onClick={() => handleChartSelected(chart)}
        />
      ))}
    </List>
  );

  const handleChartSelected = (chart: Chart) => {
    setReloading(true);
    setCurrentChart(chart);
    handleCloseMobileMenu();
    setTimeout(() => {
      setReloading(false);
    }, 10);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const displayChartView =
    currentChart &&
    !reloading &&
    (isMediumScreen || (!isMediumScreen && !mobileMenuOpen));

  return (
    <Grid container alignItems="stretch" direction="row">
      {(isMediumScreen || mobileMenuOpen) && (
        <Grid size={isMediumScreen ? 4 : 12}>{chartOptions}</Grid>
      )}

      <Grid size={isMediumScreen ? 8 : 12}>
        {!isMediumScreen && displayChartView && (
          <IconButton
            disableRipple
            onClick={handleOpenMobileMenu}
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
        )}
        {displayChartView && <ChartView chart={currentChart} />}
      </Grid>

      {(isMediumScreen || mobileMenuOpen) && (
        <AddChartDialog onChartAdded={handleChartSelected} />
      )}
    </Grid>
  );
}
