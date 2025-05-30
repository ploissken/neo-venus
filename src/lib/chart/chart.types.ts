import { ChartLocation } from "./location.types";

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
  date: string;
  name?: string;
  location?: ChartLocation;
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

export interface ParsedDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekDay?: number;
}

export interface ChartMetadata {
  date: string;
  inputDate: {
    date: string;
    naiveDate: ParsedDate;
  };
  julDayUT: number;
  location: ChartLocation;
  timezone: string;
  utc: ParsedDate;
  name?: string;
}

export interface PlanetAspect {
  aspectIndex: Aspect;
  direction: string;
  dms: string;
  planetA: Planet;
  planetB: Planet;
  value: number;
}

export interface ChartElements {
  earth: number;
  fire: number;
  water: number;
  air: number;
}

export interface Chart {
  planets: ChartPlanet[];
  houses: ChartHouse[];
  aspects: PlanetAspect[];
  metadata: ChartMetadata;
  asc?: ChartHouse;
  elements: ChartElements;
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
