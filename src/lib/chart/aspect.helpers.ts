import { Aspect } from "./chart.types";

export const getAspectProperties = (aspectIndex: Aspect) => {
  switch (aspectIndex) {
    case Aspect.Opposition:
    case Aspect.Square:
    case Aspect.Quincux:
      return { challenging: true, major: true };

    case Aspect.SemiSquare:
    case Aspect.SesquiQuadrate:
      return { challenging: true, major: false };

    case Aspect.Conjunction:
    case Aspect.SemiSextile:
    case Aspect.Trine:
    case Aspect.Sextile:
      return { challenging: false, major: true };

    case Aspect.Quintile:
    default:
      return { challenging: false, major: false };
  }
};
