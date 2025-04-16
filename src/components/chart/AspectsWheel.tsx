import { Aspect, ChartPlanet, PlanetAspect } from "@/lib/chart.types";

interface AspectsWheelProps {
  aspects: PlanetAspect[];
  planets: ChartPlanet[];
  size: number;
}

const getAspectStyle = (aspectIndex: Aspect) => {
  const easy = {
    stroke: "cyan",
  };

  const difficult = {
    stroke: "red",
  };

  const minor = { strokeDasharray: 4 };

  switch (aspectIndex) {
    case Aspect.Opposition:
    case Aspect.Square:
      return { ...difficult };

    case Aspect.SemiSquare:
    case Aspect.SesquiQuadrate:
    case Aspect.Quincux:
    case Aspect.SemiSextile:
      return { ...difficult, ...minor };

    case Aspect.Conjunction:
    case Aspect.Trine:
    case Aspect.Sextile:
      return { ...easy };

    case Aspect.Quintile:
      return { ...easy, ...minor };
    default:
      return { stroke: "white", ...minor };
  }
};

export default function AspectsWheel({
  aspects,
  planets,
  size,
}: AspectsWheelProps) {
  const radius = 0.25 * size;

  const renderingAspects = aspects.map(({ aspectIndex, planetA, planetB }) => ({
    aspectIndex,
    planetALongitude: planets.find((planet) => planet.planetIndex === planetA)
      ?.renderMarker,
    planetBLongitude: planets.find((planet) => planet.planetIndex === planetB)
      ?.renderMarker,
  }));

  return (
    <svg width={size} height={size} viewBox={`0, 0, ${size} ${size}`}>
      {renderingAspects.map((aspect, index) => (
        <line
          key={index}
          x1={
            size / 2 +
            radius * Math.cos((aspect.planetALongitude! * Math.PI) / 180)
          }
          y1={
            size / 2 +
            radius * Math.sin((aspect.planetALongitude! * Math.PI) / 180)
          }
          x2={
            size / 2 +
            radius * Math.cos((aspect.planetBLongitude! * Math.PI) / 180)
          }
          y2={
            size / 2 +
            radius * Math.sin((aspect.planetBLongitude! * Math.PI) / 180)
          }
          {...getAspectStyle(aspect.aspectIndex)}
        />
      ))}
    </svg>
  );
}
