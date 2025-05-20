import { BaseChartObject, Chart } from "@/lib/chart.types";

const baseChartObject: BaseChartObject = {
  signIndex: 0,
  longitude: 0,
  renderLongitude: 0,
  degrees: 1,
  minutes: 2,
  seconds: 3,
};

const asc = {
  ...baseChartObject,
  houseIndex: 0,
  longitude: 10,
};

export const mockChart: Chart = {
  asc,
  planets: [
    {
      ...baseChartObject,
      planetIndex: 1,
      renderMarker: 321,
    },
    {
      ...baseChartObject,
      planetIndex: 2,
      renderMarker: 123,
    },
  ],
  houses: [asc],
  aspects: [
    {
      aspectIndex: 0,
      direction: "a",
      dms: `4°9'45"`,
      planetA: 0,
      planetB: 1,
      value: 1,
    },
    {
      aspectIndex: 1,
      direction: "s",
      dms: `0°1'5"`,
      planetA: 1,
      planetB: 2,
      value: 2,
    },
  ],
};
