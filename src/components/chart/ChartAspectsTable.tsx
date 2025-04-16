import { Aspect, Planet, PlanetAspect } from "@/lib/chart.types";
import Grid from "@mui/material/Grid";
import PlanetIcon from "./PlanetIcon";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { ChartContext } from "@/context/ChartContext";
import AspectIcon from "./AspectIcon";

const getAspect = (
  planetAIndex: number,
  planetBIndex: number,
  aspects: PlanetAspect[]
) => {
  const aspect = aspects.find(
    (aspect) =>
      aspect.planetA === planetAIndex && aspect.planetB === planetBIndex
  );
  if (aspect) console.log("aspect.aspectIndex", aspect.aspectIndex);
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
