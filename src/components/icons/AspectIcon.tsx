import { Aspect, ASPECT_SIZE, getAspectProperties } from "@/lib";

import {
  Conjunction,
  SemiSextile,
  Square,
  SemiSquare,
  Sextile,
  Quintile,
  Trine,
  SesquiQuadrate,
  BiQuintile,
  Quincux,
  Opposition,
} from "./aspects";

interface AspectIconProps {
  aspect: Aspect;
  color?: string;
  size?: number;
  x?: number;
  y?: number;
}

function getAspectIcon(aspect: Aspect) {
  switch (aspect) {
    case Aspect.Conjunction:
      return <Conjunction />;
    case Aspect.SemiSextile:
      return <SemiSextile />;
    case Aspect.SemiSquare:
      return <SemiSquare />;
    case Aspect.Sextile:
      return <Sextile />;
    case Aspect.Quintile:
      return <Quintile />;
    case Aspect.Square:
      return <Square />;
    case Aspect.Trine:
      return <Trine />;
    case Aspect.SesquiQuadrate:
      return <SesquiQuadrate />;
    case Aspect.BiQuintile:
      return <BiQuintile />;
    case Aspect.Quincux:
      return <Quincux />;
    case Aspect.Opposition:
      return <Opposition />;
    default:
      throw new Error("Unknown aspect identifier");
  }
}

export function AspectIcon({
  aspect,
  size = ASPECT_SIZE,
  x = 0,
  y = 0,
}: AspectIconProps) {
  const easy = { fill: "cyan" };
  const difficult = { fill: "red" };
  const minor = { fill: "white" };

  const aspectIcon = getAspectIcon(aspect);
  const aspectProperties = getAspectProperties(aspect);
  const aspectStyle = aspectProperties.major
    ? aspectProperties.challenging
      ? difficult
      : easy
    : minor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      x={x}
      y={y}
      {...aspectStyle}
    >
      {aspectIcon}
    </svg>
  );
}
