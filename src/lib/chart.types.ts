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

export interface ChartGenerationData {
  latitude: number;
  longitude: number;
  referenceDate: Date;
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

export interface Chart {
  planets: ChartPlanet[];
  houses: ChartHouse[];
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
