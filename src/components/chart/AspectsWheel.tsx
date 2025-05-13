import {
  ANIMATION_ASPECT_DELAY,
  ANIMATION_ASPECT_DURATION,
  ANIMATION_ZODIAC_HOUSE_TOTAL,
  ASPECT_WHEEL_PROPORTION,
  Aspect,
  ChartPlanet,
  PlanetAspect,
  getAspectProperties,
} from "@/lib";

import { motion } from "framer-motion";

interface AspectsWheelProps {
  aspects: PlanetAspect[];
  planets: ChartPlanet[];
  size: number;
  delayAnimation?: boolean;
}

const getAspectStyle = (aspectIndex: Aspect) => {
  const easy = {
    stroke: "cyan",
    filter: "url(#glow)",
  };

  const difficult = {
    stroke: "red",
    filter: "url(#pulse)",
  };

  const minor = { strokeDasharray: 4 };

  const aspectProperties = getAspectProperties(aspectIndex);

  if (aspectProperties.challenging) {
    return aspectProperties.major ? difficult : { ...difficult, ...minor };
  } else {
    return aspectProperties.major ? easy : { stroke: "white", ...minor };
  }
};

export function AspectsWheel({
  aspects,
  planets,
  size,
  delayAnimation = true,
}: AspectsWheelProps) {
  const radius = ASPECT_WHEEL_PROPORTION * size;

  const renderingAspects = aspects.map(({ aspectIndex, planetA, planetB }) => ({
    aspectIndex,
    planetALongitude: planets.find((planet) => planet.planetIndex === planetA)
      ?.renderMarker,
    planetBLongitude: planets.find((planet) => planet.planetIndex === planetB)
      ?.renderMarker,
  }));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0">
            <animate
              attributeName="stdDeviation"
              values="0;0.6;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </feGaussianBlur>
        </filter>
      </defs>
      {renderingAspects.map((aspect, index) => {
        const angleA = (aspect.planetALongitude! * Math.PI) / 180;
        const angleB = (aspect.planetBLongitude! * Math.PI) / 180;
        const animationDelay = delayAnimation
          ? ANIMATION_ZODIAC_HOUSE_TOTAL
          : 0;

        const x1 = size / 2 + radius * Math.cos(angleA);
        const y1 = size / 2 + radius * Math.sin(angleA);
        const x2 = size / 2 + radius * Math.cos(angleB);
        const y2 = size / 2 + radius * Math.sin(angleB);

        return (
          <motion.line
            key={index}
            x1={x1}
            y1={y1}
            initial={{ x2: x1, y2: y1 }}
            animate={{ x2, y2 }}
            transition={{
              delay: animationDelay + index * ANIMATION_ASPECT_DELAY,
              duration: ANIMATION_ASPECT_DURATION,
              ease: "easeOut",
            }}
            {...getAspectStyle(aspect.aspectIndex)}
          />
        );
      })}
    </svg>
  );
}
