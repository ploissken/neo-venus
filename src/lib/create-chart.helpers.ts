import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "./chart.types";

type BackendResponse = {
  [key: string]: number;
};

const treatPlanetaryCollision = (planets: ChartPlanet[]): ChartPlanet[] => {
  const COLLISION_THRESHOLD = 10;
  const SPREAD_DELTA = 8;

  const sortedPlanets = planets.sort(
    (a, b) => a.renderLongitude - b.renderLongitude
  );

  const clusters: ChartPlanet[][] = [];
  let currentCluster: ChartPlanet[] = [];

  for (let i = 0; i < sortedPlanets.length; i++) {
    const currentPlanet = sortedPlanets[i];
    const previousPlanet = sortedPlanets[i - 1];

    if (
      currentCluster.length === 0 ||
      (previousPlanet &&
        Math.abs(
          currentPlanet.renderLongitude - previousPlanet.renderLongitude
        ) <= COLLISION_THRESHOLD)
    ) {
      currentCluster.push(currentPlanet);
    } else {
      clusters.push(currentCluster);
      currentCluster = [currentPlanet];
    }
  }

  if (currentCluster.length > 0) {
    clusters.push(currentCluster);
  }

  const colisionTreatedPlanets: ChartPlanet[] = [];

  clusters.forEach((cluster) => {
    const clusterCenter =
      cluster.reduce((sum, planet) => sum + planet.renderLongitude, 0) /
      cluster.length;

    cluster.forEach((planet, index) => {
      const adjustedLongitude =
        clusterCenter + (index - Math.floor(cluster.length / 2)) * SPREAD_DELTA;
      planet.renderLongitude = adjustedLongitude;
      colisionTreatedPlanets.push(planet);
    });
  });

  return colisionTreatedPlanets.sort((a, b) => a.planetIndex - b.planetIndex);
};

export const mapPlanets = (
  planets: BackendResponse[],
  ascendantLongitude: number = 0
): ChartPlanet[] => {
  const mappedPlanets: ChartPlanet[] = planets.map(
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
      longitude,
      renderLongitude: -(longitude + ascendantLongitude),
      renderMarker: -(longitude + ascendantLongitude),
      degrees,
      minutes,
      seconds,
    })
  );
  return treatPlanetaryCollision(mappedPlanets);
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
