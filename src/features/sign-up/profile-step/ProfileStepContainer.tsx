import {
  Grid,
} from "@mui/material";
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
      size={{ xs: 12, md: 6 }}
      direction="column"
      sx={{
        py: 4,
        gap: 2,
      }}
    >
      <ProfileForm
        onStepComplete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Grid>
  );
}
