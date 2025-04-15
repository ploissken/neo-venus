import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "./chart.types";

type BackendResponse = {
  [key: string]: number;
};

export const mapPlanets = (
  planets: BackendResponse[],
  ascendantLongitude: number = 0
): ChartPlanet[] => {
  return planets.map(
    ({
      planet_id,
      sign_id,
      longitude,
      degrees,
      minutes,
      seconds,
    }: BackendResponse) => ({
      planetIndex: planet_id as Planet,
      signIndex: sign_id as ZodiacSign,
      longitude: longitude,
      renderLongitude: -(longitude + ascendantLongitude),
      degrees,
      minutes,
      seconds,
    })
  );
};

export const mapHouses = (houses: BackendResponse[]): ChartHouse[] => {
  const mappedHouses: ChartHouse[] = houses.map(
    ({
      house,
      start_degree,
      sign_id,
      degrees,
      minutes,
      seconds,
    }: BackendResponse) => ({
      houseIndex: house,
      longitude: start_degree,
      renderLongitude: start_degree - houses[0].start_degree + 180,
      signIndex: sign_id as ZodiacSign,
      degrees,
      minutes,
      seconds,
    })
  );
  return mappedHouses;
};
