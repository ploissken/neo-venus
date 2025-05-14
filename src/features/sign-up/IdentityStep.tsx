import { Google } from "@mui/icons-material";
import { Button, Chip, Divider, Grid, TextField } from "@mui/material";

export function IdentityStep({
  onStepComplete,
}: {
  onStepComplete: () => void;
}) {
  return (
    <Grid
      data-testid="identity-step-container"
      container
      size={6}
      direction="column"
      sx={{
        py: 4,
        gap: 2,
      }}
    >
      <Button variant="outlined" startIcon={<Google />}>
        Sign up with Google
      </Button>
      <Divider>
        <Chip label="OR" size="small" />
      </Divider>
      <TextField id="username" label="Username" variant="outlined" />
      <TextField id="email" label="E-mail" variant="outlined" type="email" />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
      />
      <TextField
        id="confirm-password"
        label="Confirm Password"
        variant="outlined"
        type="password"
      />
      <Button variant="contained" onClick={onStepComplete}>
        Sign up
      </Button>
    </Grid>
  );
}
