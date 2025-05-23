import { Grid } from "@mui/material";
import { ProfileForm } from "./ProfileForm";

export function ProfileStepContainer({
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
      <ProfileForm onIdentityCreated={onStepComplete} />
    </Grid>
  );
}
