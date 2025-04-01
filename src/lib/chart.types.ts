export const bodyList = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

export const signName = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

export interface ChartGenerationData {
  latitude: number;
  longitude: number;
  referenceDate: Date;
}

export interface ChartPlanet {
  name: string;
  sign: string;
  hour: number;
  min: number;
  sec: number;
}
