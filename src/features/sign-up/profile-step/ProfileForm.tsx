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
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChartLocation } from "@/lib";

export type ProfileFormInputs = {
  fullName: string;
  username: string;
  dateValue: Date;
  location: ChartLocation;
  genderIdentities: string[];
  sexualOrientations: string[];
};

export function ProfileForm({
  onStepComplete,
}: {
  onStepComplete: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileFormInputs>({ mode: "onChange" });
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useSnackbar();

  const handleUsernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setValue("username", trimmed, { shouldValidate: true });
    setLoading(false);
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    setLoading(true);
    fetch("/api/user-update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const fetchData = await response.json();
        if (fetchData.ok) {
          //   onIdentityCreated(fetchData.data);
        } else {
          showMessage(t(`form.profile.error.${fetchData.error}`), "error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        data-testid="profile-step-form"
        container
        size={12}
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
        <TextField
          id="fullName"
          label="Full Name"
          variant="outlined"
          {...register("fullName")}
        />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          error={!!errors?.username}
          helperText={errors?.username?.message}
          {...register("username", {
            required: "Username is required",
            validate: {
              noSpaces: (v) =>
                /^\S+$/.test(v) || "Username cannot contain spaces",
              minLength: (v) =>
                v.length >= 3 || "Username must be at least 3 characters",
              maxLength: (v) =>
                v.length <= 32 || "Username must be 32 characters maximum",
            },
            setValueAs: (v) => v.trim(),
          })}
          onBlur={handleUsernameBlur}
        />
        <Divider>
          <Chip
            label="Your astral chart data"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Divider>
        {/* TODO: replace by DatePicker and TimePicker or Controller these */}
        {/* <DateTimePicker onDateChanged={() => {}} /> */}
        {/* <LocationPicker onLocationChanged={() => {}} /> */}

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
          disabled
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
            <TextField
              {...params}
              variant="outlined"
              label="Gender Identities"
            />
          )}
        />
        <Autocomplete
          multiple
          disabled
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
        <Button
          variant="contained"
          onClick={onStepComplete}
          type="submit"
          loading={loading}
        >
          Create Profile
        </Button>
      </Grid>
    </form>
  );
}
