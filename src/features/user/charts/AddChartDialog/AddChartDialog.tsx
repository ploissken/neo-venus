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
import {
  ChartForm,
  ChartFormInputs,
} from "@/features/user/sign-up/chart-step/ChartForm";
import { useChartList } from "@/context";

export function AddChartDialog({
  onChartAdded,
}: {
  onChartAdded: (chart: Chart) => void;
}) {
  const [open, setOpen] = useState(false);
  const { authFetch } = useFetch();
  const { showMessage } = useSnackbar();
  const { addChart } = useChartList();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const handleSaveChart = (data: ChartFormInputs) => {
    setLoading(true);
    authFetch<Chart>("/api/chart/save", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          onChartAdded(response.data);
          showMessage(
            t(`form.chart.save_success`, { name: data?.name || "" }),
            "info"
          );
          addChart(response.data);
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
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("form.chart.add")}</DialogTitle>
        <DialogContent>
          <ChartForm
            onChartDataReady={(data) => handleSaveChart(data)}
            loading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            {t("form.chart.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
