import Astronomy from "./astronomy.browser";
import { ChartGenerationData, ChartPlanet, Planet } from "./chart.types";

export const buildChartPlanets = ({
  referenceDate,
  latitude,
  longitude,
}: ChartGenerationData) => {
  const observer = new Astronomy.Observer(latitude, longitude, 0);
  const planets = Array<ChartPlanet>();

  const planetNames: Array<keyof typeof Planet> = Object.keys(Planet).filter(
    (key) => isNaN(Number(key))
  ) as Array<keyof typeof Planet>;

  planetNames.forEach((planet, planetIndex) => {
    const equatorOfDate = Astronomy.Equator(
      planet,
      referenceDate,
      observer,
      true,
      true
    );

    const horizonOfDate = Astronomy.Horizon(
      referenceDate,
      observer,
      equatorOfDate.ra,
      equatorOfDate.dec,
      "normal"
    );

    console.log("horizonOfDate", horizonOfDate);

    const degree = horizonOfDate.ra * 15;
    const signIndex = Math.floor(degree / 30);
    const lang30 = degree - signIndex * 30;
    const hour = Math.floor(lang30);
    const minFraction = (lang30 - hour) * 60;
    const min = Math.floor(minFraction);
    const sec = Math.floor((minFraction - min) * 60);

    planets.push({
      planetIndex,
      signIndex,
      ra: -1 * equatorOfDate.ra + 9.1,
      hour,
      min,
      sec,
    });
  });

  return planets;
};
