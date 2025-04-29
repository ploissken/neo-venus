import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  return <h1>{t("about.title")}</h1>;
}
