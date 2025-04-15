import { Aspect } from "@/lib/chart.types";

import { ASPECT_SIZE } from "@/lib/chart.consts";
import Conjunction from "../icons/aspects/Conjunction";
import SemiSextile from "../icons/aspects/SemiSextile";
import SemiSquare from "../icons/aspects/SemiSquare";
import Sextile from "../icons/aspects/Sextile";
import Quintile from "../icons/aspects/Quintuile";
import Square from "../icons/aspects/Square";
import Trine from "../icons/aspects/Trine";
import SesquiQuadrate from "../icons/aspects/SesquiQuadrate";
import BiQuintile from "../icons/aspects/BiQuintile";
import Quincux from "../icons/aspects/Quincux";
import Opposition from "../icons/aspects/Opposition";

interface AspectIconProps {
  aspect: Aspect;
  color?: string;
  size?: number;
  x?: number;
  y?: number;
}

function getAspectIcon(aspect: Aspect) {
  console.log("aspect", aspect);
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
      console.log(Aspect.BiQuintile, aspect);
      throw new Error("Unknown aspect identifier");
  }
}

export default function AspectIcon({
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
