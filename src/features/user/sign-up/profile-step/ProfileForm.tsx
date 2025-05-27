import Image from "next/image";
import defaultAvatar from "@/assets/images/avatar/default-1.png";
import { Avatar, Button, Chip, Divider, Grid, TextField } from "@mui/material";
import { useSnackbar, useFetch } from "@/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ProfileFormFields,
  useGenderOptions,
  useOrientationOptions,
} from "@/lib/profile.helpers";
import { UsernameField, ControlledMultiSelect } from "@/components/profile";
import { ChartLocation } from "@/lib/chart";

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
  const methods = useForm<ProfileFormInputs>({
    defaultValues: {
      // must be set so react understands it as a controlled component
      [ProfileFormFields.Username]: "",
    },
    mode: "onChange",
  });
  const { register, handleSubmit, control } = methods;
  const t = useTranslations();
  const { authFetch } = useFetch();

  const [loading, setLoading] = useState(false);

  const { showMessage } = useSnackbar();

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    setLoading(true);
    // todo: define type user
    authFetch<{ user: unknown }>("/api/user/update", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          onIdentityCreated();
        } else {
          showMessage(t(`form.profile.error.${response.error}`), "error");
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
                alt={t("form.profile.avatar.label")}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Avatar>
          </Grid>
          <TextField
            id="fullName"
            label={t("form.profile.full_name.label")}
            variant="outlined"
            {...register(ProfileFormFields.FullName)}
          />
          <UsernameField />

          <Divider>
            <Chip
              label={t("sogi.label")}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Divider>

          <ControlledMultiSelect<ProfileFormInputs>
            control={control}
            name={ProfileFormFields.Gender}
            options={useGenderOptions()}
            label={t("form.profile.gender.label")}
          />

          <ControlledMultiSelect<ProfileFormInputs>
            control={control}
            name={ProfileFormFields.Orientation}
            options={useOrientationOptions()}
            label={t("form.profile.orientation.label")}
          />

          <Button variant="contained" type="submit" loading={loading}>
            {t("form.profile.submit")}
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}
