import { createTranslator, Messages } from "next-intl";
import { ParsedDate } from "./chart.types";

export type TFunction = ReturnType<typeof createTranslator<Messages>>;

enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

enum Months {
  January,
  February,
  Mars,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const getWeekdayName = (weekDay: number, t: TFunction) =>
  t(`dates.weekdays.${Weekdays[weekDay].toLowerCase()}`) + ",";

export const getMonthName = (month: number, t: TFunction) =>
  t(`dates.months.${Months[month - 1].toLowerCase()}`);

export const getNaiveDate = (naiveDate: ParsedDate, t: TFunction) => {
  const { weekDay, day, month, year } = naiveDate;
  const weekDayString = weekDay !== undefined ? getWeekdayName(weekDay, t) : "";
  const monthString = getMonthName(month, t);

  return `${weekDayString} ${day} ${monthString} ${year}`.trim();
};

export const getNaiveTime = ({
  hour,
  minute,
}: {
  hour: number;
  minute: number;
}) => {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};
