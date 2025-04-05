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

export interface ChartPlanet {
  planetIndex: Planet;
  signIndex: ZodiacSign;
  hour: number;
  min: number;
  sec: number;
}
