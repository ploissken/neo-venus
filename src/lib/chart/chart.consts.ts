import { DividerColors, SignColors } from "./chart.types";

export const CHART_SMALL_SIZE = 300;
export const CHART_DEFAULT_SIZE = 500;
export const CHART_LARGE_SIZE = 600;

export const PLANET_SIZE = 20;
export const PLANET_MARKER_START = 1.08;
export const PLANET_MARKER_END = 1.15;

export const HOUSE_WHEEL_PROPORTION = 0.35;
export const PLANET_WHEEL_PROPORTION = 0.34;
export const ASPECT_WHEEL_PROPORTION = 0.25;

export const ASPECT_SIZE = 15;
export const ZODIAC_SIGN_SIZE = 20;

export const ANIMATION_ZODIAC_DURATION = 1;
export const ANIMATION_HOUSE_DURATION = 0.1;
export const ANIMATION_HOUSE_DELAY = 0.03;
export const ANIMATION_PLANET_DELAY = 0.1;
export const ANIMATION_ASPECT_DELAY = 0.05;
export const ANIMATION_ASPECT_DURATION = 0.1;
export const ANIMATION_ZODIAC_HOUSE_TOTAL = 1.5;

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
