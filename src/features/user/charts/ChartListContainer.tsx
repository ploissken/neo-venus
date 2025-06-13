"use client";
import { useFetch } from "@/hooks";
import { Chart } from "@/lib/chart";
import { useEffect, useState } from "react";
import ChartListItem from "./ChartListItem";
import { Grid, List } from "@mui/material";
import { ChartView } from "./ChartView";
import { AddChartDialog } from "./AddChartDialog";

export default function ChartListContainer() {
  const { authFetch } = useFetch();
  const [userCharts, setUserCharts] = useState<Chart[]>([]);
  const [currentChart, setCurrentChart] = useState<Chart | undefined>();
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    authFetch<Chart[]>(`/api/user/get-charts`).then((response) => {
      if (!("error" in response)) {
        const { data } = response;
        setUserCharts(data);
        if (data.length > 0) {
          setCurrentChart(data[0]);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChartSelected = (chart: Chart) => {
    setReloading(true);
    setCurrentChart(chart);
    setTimeout(() => {
      setReloading(false);
    }, 10);
  };

  return (
    <Grid container>
      <Grid size={4}>
        <List component="nav">
          {(userCharts || []).map((chart) => (
            <ChartListItem
              key={chart.id}
              selectedId={currentChart?.id}
              chart={chart}
              onClick={() => handleChartSelected(chart)}
            />
          ))}
        </List>
      </Grid>
      <Grid size={8}>
        {currentChart && !reloading && <ChartView chart={currentChart} />}
      </Grid>
      <AddChartDialog />
    </Grid>
  );
}
