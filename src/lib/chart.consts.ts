import { DividerColors, SignColors } from "./chart.types";

export const CHART_SMALL_SIZE = 350;
export const CHART_DEFAULT_SIZE = 500;
export const CHART_LARGE_SIZE = 600;

export const PLANET_SIZE = 20;
export const PLANET_WHEEL_PROPORTION = 0.34;
export const PLANET_MARKER_START = 1.08;
export const PLANET_MARKER_END = 1.15;

export const HOUSE_WHEEL_PROPORTION = 0.35;

export const ASPECT_SIZE = 15;

export const ZODIAC_SIGN_SIZE = 20;

export const defaultDividerColor: DividerColors = {
  degree: "lightgray",
  house: "gray",
};

export const defaultSignColors: SignColors = {
  air: "gray",
  earth: "green",
  fire: "brown",
  water: "cyan",
};
