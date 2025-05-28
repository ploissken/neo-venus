import { Google } from "@mui/icons-material";
import { Button, Chip, Divider, Grid } from "@mui/material";
import { IdentityForm } from "./IdentityForm";

export function IdentityStepContainer({
  onStepComplete,
}: {
  onStepComplete: () => void;
}) {
  return (
    <Grid
      data-testid="identity-step-container"
      container
      size={12}
      direction="column"
      sx={{
        py: 4,
        gap: 2,
      }}
    >
      <Button variant="outlined" startIcon={<Google />} disabled>
        Sign up with Google
      </Button>
      <Divider>
        <Chip label="OR" size="small" />
      </Divider>
      <IdentityForm onIdentityCreated={onStepComplete} />
    </Grid>
  );
}
