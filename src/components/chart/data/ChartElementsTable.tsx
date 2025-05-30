import { ChartElements } from "@/lib/chart";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export function ChartElementsTable({ elements }: { elements: ChartElements }) {
  const t = useTranslations();
  const elementKeys = ["air", "earth", "fire", "water"] as const;

  const elementColor: Record<keyof ChartElements, string> = {
    air: "silver",
    earth: "green",
    fire: "red",
    water: "cyan",
  };

  const getElementSize = (elementKey: keyof ChartElements) => {
    const elementName = t(`chart.elements.${elementKey}`);
    const elementLabel = `${elementName}: ${elements[elementKey].toFixed(2)}%`;
    return (
      <Tooltip key={elementKey} title={elementLabel}>
        <Box
          sx={{
            backgroundColor: elementColor[elementKey],
            width: `${elements[elementKey]}%`,
            height: 8,
          }}
        ></Box>
      </Tooltip>
    );
  };

  return (
    <Grid size={12}>
      <Typography variant="h6">{t(`chart.elements.title`)}</Typography>
      <Grid container>
        {elementKeys.map((element) => getElementSize(element))}
      </Grid>
    </Grid>
  );
}
