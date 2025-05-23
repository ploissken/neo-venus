import { Grid, Theme } from "@mui/material";
import { SignInForm } from "./SignInForm";

export function SignInContainer() {
  return (
    <Grid
      data-testid="sign-in-container"
      container
      direction="column"
      alignItems="center"
      size={12}
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        p: 2,
        m: 2,
      })}
    >
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "50vh" }}
      >
        <SignInForm />
      </Grid>
    </Grid>
  );
}
