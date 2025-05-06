export enum Planet {
  Sun,
  Moon,
  Mercury,
  Venus,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
}

export enum ZodiacSign {
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
  Capricorn,
  Aquarius,
  Pisces,
}

export enum Aspect {
  Conjunction,
  SemiSextile,
  SemiSquare,
  Sextile,
  Quintile,
  Square,
  Trine,
  SesquiQuadrate,
  BiQuintile,
  Quincux,
  Opposition,
}

export interface ChartGenerationData {
  referenceDate: Date;
  latitude?: number;
  longitude?: number;
}

export interface BaseChartObject {
  signIndex: ZodiacSign;
  longitude: number;
  renderLongitude: number;
  degrees: number;
  minutes: number;
  seconds: number;
}

export interface ChartPlanet extends BaseChartObject {
  planetIndex: Planet;
  renderMarker: number;
}

export interface ChartHouse extends BaseChartObject {
  houseIndex: number;
}

export interface PlanetAspect {
  aspectIndex: Aspect;
  direction: string;
  dms: string;
  planetA: Planet;
  planetB: Planet;
  value: number;
}

export interface Chart {
  planets: ChartPlanet[];
  houses: ChartHouse[];
  aspects: PlanetAspect[];
  asc?: ChartHouse;
}

export interface DividerColors {
  degree: string;
  house: string;
}

export interface SignColors {
  air?: string;
  earth?: string;
  fire?: string;
  water?: string;
}
