import { TextField } from "@mui/material";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ProfileFormInputs } from "@/features/sign-up/profile-step/ProfileForm";

export function UsernameField() {
  const t = useTranslations();
  const { showMessage } = useSnackbar();
  const [usernameStatus, setUsernameStatus] = useState<
    "checking" | "available" | "unavailable" | undefined
  >(undefined);

  const {
    control,
    setValue,
    clearErrors,
    trigger,
    formState: { touchedFields, errors },
  } = useFormContext<ProfileFormInputs>();

  const handleUsernameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = event.target.value.trim();
    setValue("username", trimmed, { shouldValidate: true });

    if (!errors.username) {
      setUsernameStatus("checking");

      fetch(`/api/username-available?u=${trimmed}`)
        .then(async (response) => await response.json())
        .then((response) => {
          setUsernameStatus(
            response.data.available ? "available" : "unavailable"
          );
        })
        .catch(() => {
          showMessage(t("form.profile.error.unknown"), "error");
          setUsernameStatus(undefined);
        });
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameStatus(undefined);
    clearErrors("username");
    setValue("username", event.target.value.toLowerCase(), {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    trigger("username");
  }, [trigger, usernameStatus]);

  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          name="username"
          label="Username"
          variant="outlined"
          error={touchedFields.username && !!errors.username}
          helperText={
            touchedFields.username ? errors.username?.message : undefined
          }
          onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
        />
      )}
      rules={{
        required: "Username is required",
        validate: {
          noSpaces: (v) => /^\S+$/.test(v) || "Username cannot contain spaces",
          minLength: (v) =>
            v.length >= 3 || "Username must be at least 3 characters",
          maxLength: (v) =>
            v.length <= 32 || "Username must be 32 characters maximum",
          available: () =>
            usernameStatus !== "unavailable" || "Username already registered",
        },
      }}
    />
  );
}
