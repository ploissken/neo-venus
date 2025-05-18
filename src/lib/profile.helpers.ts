import { useTranslations } from "next-intl";

export const genderIds = [
  "MALE",
  "FEMALE",
  "NB",
  "TRANS",
  "NEUTRAL",
  "OTHER",
  "UNDECLARED",
] as const;

export const orientationIds = [
  "STRAIGHT",
  "GAY",
  "BI",
  "QUEER",
  "PAN",
  "ASEX",
  "OTHER",
  "UNDECLARED",
] as const;

export type GenderId = (typeof genderIds)[number];
export type OrientationId = (typeof orientationIds)[number];

function useOptions<T extends readonly string[]>(ids: T, scope: string) {
  const t = useTranslations(scope);
  return ids.map((id) => ({ id, label: t(id.toLowerCase()) }));
}

export const useGenderOptions = () => useOptions(genderIds, "sogi.gender");
export const useOrientationOptions = () =>
  useOptions(orientationIds, "sogi.orientation");
