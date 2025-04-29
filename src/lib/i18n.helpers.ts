import { cookies } from "next/headers";

const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: unknown): value is Locale => {
  return typeof value === "string" && locales.includes(value as Locale);
};

export const getLocale = async (): Promise<Locale> => {
  const storedLocale = (await cookies()).get("locale")?.value;
  return isLocale(storedLocale) ? storedLocale : "en";
};
