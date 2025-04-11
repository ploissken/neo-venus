import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "./chart.types";

type BackendResponse = {
  [key: string]: number;
};

export const mapPlanets = (planets: BackendResponse[]): ChartPlanet[] => {
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
      degrees,
      minutes,
      seconds,
    })
  );
};

export const mapHouses = (houses: BackendResponse[]): ChartHouse[] => {
  return houses.map(
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
      signIndex: sign_id as ZodiacSign,
      degrees,
      minutes,
      seconds,
    })
  );
};
