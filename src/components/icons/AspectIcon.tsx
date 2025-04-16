import { Aspect } from "@/lib/chart.types";

import { ASPECT_SIZE } from "@/lib/chart.consts";
import Conjunction from "./aspects/Conjunction";
import SemiSextile from "./aspects/SemiSextile";
import SemiSquare from "./aspects/SemiSquare";
import Sextile from "./aspects/Sextile";
import Quintile from "./aspects/Quintuile";
import Square from "./aspects/Square";
import Trine from "./aspects/Trine";
import SesquiQuadrate from "./aspects/SesquiQuadrate";
import BiQuintile from "./aspects/BiQuintile";
import Quincux from "./aspects/Quincux";
import Opposition from "./aspects/Opposition";

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
  color = "lightgrey",
  size = ASPECT_SIZE,
  x = 0,
  y = 0,
}: AspectIconProps) {
  const aspectIcon = getAspectIcon(aspect);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill={color}
      x={x}
      y={y}
    >
      {aspectIcon}
    </svg>
  );
}
