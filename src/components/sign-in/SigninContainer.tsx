"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

export default function SigninContainer() {
  const todoFunction = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("not implemented");
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      spacing={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{
        minWidth: "100%",
        mx: "auto",
        py: 12,
      }}
    >
      <Grid
        size={{ xs: 3, sm: 6, md: 6, lg: 4 }}
        sx={{ ma: "auto", display: "flex" }}
        alignContent="center"
        alignItems="center"
      >
        <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={todoFunction}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={todoFunction}
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, m: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link
                href="/sign-up/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
