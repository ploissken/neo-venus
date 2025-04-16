import { Planet, PlanetAspect } from "@/lib/chart.types";
import Grid from "@mui/material/Grid";
import PlanetIcon from "../icons/PlanetIcon";
import { useContext } from "react";
import { ChartContext } from "@/context/ChartContext";
import AspectIcon from "../icons/AspectIcon";

const getAspect = (
  planetAIndex: Planet,
  planetBIndex: Planet,
  aspects: PlanetAspect[]
) => {
  const aspect = aspects.find(
    (aspect) =>
      aspect.planetA === planetAIndex && aspect.planetB === planetBIndex
  );
  return aspect ? <AspectIcon aspect={aspect.aspectIndex} /> : <></>;
};

export default function ChartAspectsTable() {
  const { chart } = useContext(ChartContext);
  if (!chart) return;

  const { aspects } = chart;
  const planets = Object.keys(Planet).filter((key) => isNaN(Number(key)));

  return (
    <>
      <h4>Aspects</h4>
      <Grid>
        {planets.map((_, rowIndex) => (
          <Grid key={rowIndex} container>
            {planets.map((__, columnIndex) => (
              <Grid key={columnIndex} container>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: 30,
                    height: 30,
                    border:
                      columnIndex < rowIndex ? "1px solid gray" : undefined,
                  }}
                >
                  {rowIndex === columnIndex ? (
                    <PlanetIcon planet={columnIndex} />
                  ) : (
                    getAspect(rowIndex, columnIndex, aspects)
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
