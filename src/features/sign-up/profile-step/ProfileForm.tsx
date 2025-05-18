import Image from "next/image";
import defaultAvatar from "@/assets/images/avatar/default-1.png";
import { Avatar, Button, Chip, Divider, Grid, TextField } from "@mui/material";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ChartLocation } from "@/lib";
import { ControlledMultiSelect } from "@/components/common/ControlledMultiSelect";
import { useGenderOptions, useOrientationOptions } from "@/lib/profile.helpers";
import { UsernameField } from "@/components/common/UsernameField";

export type ProfileFormInputs = {
  fullName: string;
  username: string;
  dateValue: Date;
  location: ChartLocation;
  genderIdentities: string[];
  sexualOrientations: string[];
};

export function ProfileForm({
  onIdentityCreated,
}: {
  onIdentityCreated: () => void;
}) {
  const methods = useForm<ProfileFormInputs>({ mode: "onChange" });
  const { register, handleSubmit, control } = methods;
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const { showMessage } = useSnackbar();

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
          onIdentityCreated();
        } else {
          showMessage(t(`form.profile.error.${fetchData.error}`), "error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <FormProvider {...methods}>
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
          <UsernameField />

          <Divider>
            <Chip
              id="SOGI"
              label="Gender and Sexual Orientation"
              size="small"
              color="primary"
              variant="outlined"
            />
          </Divider>

          <ControlledMultiSelect<ProfileFormInputs>
            control={control}
            name="genderIdentities"
            options={useGenderOptions()}
            label="Gender Identities"
          />

          <ControlledMultiSelect<ProfileFormInputs>
            control={control}
            name="sexualOrientations"
            options={useOrientationOptions()}
            label="Sexual Orientations"
          />

          <Button variant="contained" type="submit" loading={loading}>
            Create Profile
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}
