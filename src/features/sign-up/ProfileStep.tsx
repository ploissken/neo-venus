import { DateTimePicker, LocationPicker } from "@/components/chart-creation";
import Image from "next/image";
import defaultAvatar from "@/assets/images/avatar/default-1.png";
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

export function ProfileStep({
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
      <Grid container size={12} justifyContent="center">
        <Avatar
          sx={{
            width: 200,
            height: 200,
          }}
        >
          <Image
            src={defaultAvatar}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Avatar>
      </Grid>
      <TextField id="name" label="Full Name" variant="outlined" />
      <TextField id="username" label="Username" variant="outlined" />
      <Divider>
        <Chip
          label="Your astral chart data"
          size="small"
          color="primary"
          variant="outlined"
        />
      </Divider>
      <DateTimePicker onDateChanged={() => {}} />
      <LocationPicker onLocationChanged={() => {}} />
      <Divider>
        <Chip
          label="Gender and Sexual Orientation"
          size="small"
          color="primary"
          variant="outlined"
        />
      </Divider>
      <Autocomplete
        multiple
        id="tags-standard"
        options={[
          "Male",
          "Female",
          "Non Binary",
          "Transgender",
          "Neutral",
          "Other",
          "Prefer not to Say",
        ]}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Gender Identities" />
        )}
      />
      <Autocomplete
        multiple
        id="tags-standard"
        options={[
          "Heterosexual",
          "Gay",
          "Bisexual",
          "Queer",
          "Pansexual",
          "Asexual",
          "Other",
          "Prefer not to Say",
        ]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Sexual Orientations"
          />
        )}
      />
      <Button variant="contained" onClick={onStepComplete}>
        Create Profile
      </Button>
    </Grid>
  );
}
