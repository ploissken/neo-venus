import Astronomy from "./astronomy.browser";
import {
  ChartGenerationData,
  ChartPlanet,
  bodyList,
  signName,
} from "./chart.types";

export const buildChartPlanets = ({
  referenceDate,
  latitude,
  longitude,
}: ChartGenerationData) => {
  const observer = new Astronomy.Observer(latitude, longitude, 0);
  const planets = Array<ChartPlanet>();

  bodyList.forEach((body) => {
    const equatorOfDate = Astronomy.Equator(
      body,
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

    const degree = horizonOfDate.ra * 15;
    const signIndex = Math.floor(degree / 30);
    const lang30 = degree - signIndex * 30;
    const hour = Math.floor(lang30);
    const minFraction = (lang30 - hour) * 60;
    const min = Math.floor(minFraction);
    const sec = Math.floor((minFraction - min) * 60);

    planets.push({
      name: body,
      sign: signName[signIndex],
      hour,
      min,
      sec,
    });
  });

  return planets;
};
