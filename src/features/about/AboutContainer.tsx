import { Grid, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function AboutContainer() {
  const t = useTranslations();
  return (
    <Grid container justifyContent="left" sx={{ m: 2 }}>
      <Grid container sx={{ gap: 2 }}>
        <Typography variant="h4">{t("about.title")}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontStyle: "italic", width: "100%" }}
          color="silver"
        >
          {t("about.purpose")}
        </Typography>
        <Typography variant="body1" sx={{ width: "100%" }}>
          {t("about.mission")}
        </Typography>
        <Typography variant="body1" sx={{ width: "100%" }}>
          {t("about.roadmap")}
        </Typography>
        <Typography variant="body2" sx={{ width: "100%" }}>
          {t.rich("about.whoami", {
            github: (chunks) => (
              <Link
                href="https://github.com/ploissken/neo-venus/"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
            linkedin: (chunks) => (
              <Link
                href="https://www.linkedin.com/in/rodurico/"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </Grid>
    </Grid>
  );
}
