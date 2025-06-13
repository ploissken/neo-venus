// import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useFetch, useSnackbar } from "@/hooks";
import { Chart } from "@/lib/chart";
import { useTranslations } from "next-intl";
import { ChartForm } from "@/features/user/sign-up/chart-step/ChartForm";

export function AddChartDialog() {
  const [open, setOpen] = useState(false);
  const { authFetch } = useFetch();
  const { showMessage } = useSnackbar();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  //   todo: fix data type
  const handleSaveChart = (data) => {
    setLoading(true);
    authFetch<{ chart: Chart }>("/api/chart/save", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          showMessage(
            t(`form.chart.save_success`, { name: data?.name || "" }),
            "info"
          );
          setOpen(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "16px", right: "16px" }}
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="add-chart-dialog"
      >
        <DialogTitle>Add a new Chart</DialogTitle>
        <DialogContent>
          <ChartForm
            onChartDataReady={(data) => handleSaveChart(data)}
            loading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
