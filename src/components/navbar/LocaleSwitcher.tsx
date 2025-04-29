"use client";
import { Button } from "@mui/material";
import { Locale } from "@/lib/i18n.helpers";
import { useEffect, useState } from "react";

const getLocaleFromCookie = () => {
  if (!document) {
    return null;
  }
  const regex = new RegExp(`(?:^|; )locale=([^;]*)`);
  const match = document.cookie.match(regex);
  return (match ? match[1] : "en") as Locale;
};

export function LocaleSwitcher() {
  const [locale, setLocale] = useState<Locale | null>(null);

  useEffect(() => {
    const localeCookie = getLocaleFromCookie();
    setLocale(localeCookie);
  }, []);

  const handleSetLocale = (locale: "pt" | "en") => {
    document.cookie = `locale=${locale}; path=/; max-age=${
      60 * 60 * 24 * 365 * 10 // 10 years
    };`;
    location.reload();
  };

  return (
    <>
      {locale === "en" && (
        <Button
          onClick={() => handleSetLocale("pt")}
          aria-label="Switch to Portuguese"
        >
          🇧🇷
        </Button>
      )}
      {locale === "pt" && (
        <Button
          onClick={() => handleSetLocale("en")}
          aria-label="Mudar para Inglês"
        >
          🇺🇸
        </Button>
      )}
    </>
  );
}
