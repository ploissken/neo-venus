import { Button, Chip, Divider, Grid } from "@mui/material";

export function FriendsFinderStep({
  onStepComplete,
}: {
  onStepComplete: () => void;
}) {
  return (
    <Grid
      data-testid="friends-finder-step-container"
      container
      size={12}
      direction="column"
      sx={{
        py: 4,
        gap: 2,
      }}
    >
      <Divider>
        <Chip label="TODO" size="small" />
      </Divider>

      <Button variant="contained" onClick={onStepComplete}>
        OK
      </Button>
    </Grid>
  );
}
