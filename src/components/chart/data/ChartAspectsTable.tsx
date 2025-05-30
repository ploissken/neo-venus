import { Planet, PlanetAspect } from "@/lib/chart";
import { Grid } from "@mui/material";
import { AspectIcon, PlanetIcon } from "@/components/icons";
import { useTranslations } from "next-intl";

const getAspect = (
  planetAIndex: Planet,
  planetBIndex: Planet,
  aspects: PlanetAspect[]
) => {
  const aspect = aspects.find(
    (aspect) =>
      (aspect.planetA === planetAIndex && aspect.planetB === planetBIndex) ||
      (aspect.planetA === planetBIndex && aspect.planetB === planetAIndex)
  );
  return aspect ? <AspectIcon aspect={aspect.aspectIndex} /> : <></>;
};

export interface ChartAspectsTableProps {
  aspects?: PlanetAspect[];
}

export function ChartAspectsTable({ aspects }: ChartAspectsTableProps) {
  const t = useTranslations();
  if (!aspects) {
    return;
  }

  const planets = Object.keys(Planet).filter((key) => isNaN(Number(key)));

  return (
    <>
      <h4>{t("chart.data.aspects")}</h4>
      <Grid>
        {planets.map((_, planetRowIndex) => (
          <Grid key={planetRowIndex} container>
            {planets.map((__, planetColumnIndex) =>
              planetRowIndex < planetColumnIndex ? (
                <></>
              ) : (
                <Grid key={planetColumnIndex} container>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: 30,
                      height: 30,
                      border:
                        planetColumnIndex < planetRowIndex
                          ? "1px solid gray"
                          : undefined,
                    }}
                  >
                    {planetRowIndex === planetColumnIndex ? (
                      <PlanetIcon planet={planetColumnIndex} />
                    ) : (
                      getAspect(planetRowIndex, planetColumnIndex, aspects)
                    )}
                  </Grid>
                </Grid>
              )
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
