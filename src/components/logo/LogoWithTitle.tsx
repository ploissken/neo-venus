import { Grid, Typography } from "@mui/material";
import { LogoProps, Logo } from "./Logo";

export function LogoWithTitle({ size = 100, color = "white" }: LogoProps) {
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Logo size={size} color={color} />
      <Typography variant="h5" component="div">
        mercuryou
      </Typography>
    </Grid>
  );
}
