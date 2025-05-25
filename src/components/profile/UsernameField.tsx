import { InputAdornment, TextField, Tooltip } from "@mui/material";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ProfileFormInputs } from "@/features/user/sign-up/profile-step/ProfileForm";
import CheckIcon from "@mui/icons-material/Check";
import { ProfileFormFields } from "@/lib";
import { useFetch } from "@/hooks/useFetch";

export function UsernameField() {
  const t = useTranslations();
  const { showMessage } = useSnackbar();
  const serverFetch = useFetch({ auth: true });
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
    setValue(ProfileFormFields.Username, trimmed, { shouldValidate: true });

    if (!errors.username) {
      setUsernameStatus("checking");

      serverFetch<{ available: boolean }>(
        `/api/user/username-available?u=${trimmed}`
      ).then((response) => {
        if (response.ok) {
          setUsernameStatus(
            response.data.available ? "available" : "unavailable"
          );
        } else {
          showMessage(t("form.profile.error.unknown"), "error");
          setUsernameStatus(undefined);
        }
      });
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameStatus(undefined);
    clearErrors(ProfileFormFields.Username);
    setValue(ProfileFormFields.Username, event.target.value.toLowerCase(), {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    trigger(ProfileFormFields.Username);
  }, [trigger, usernameStatus]);

  return (
    <Controller
      name={ProfileFormFields.Username}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={t("form.profile.username.label")}
          variant="outlined"
          disabled={usernameStatus === "checking"}
          error={touchedFields.username && !!errors.username}
          helperText={
            touchedFields.username ? errors.username?.message : undefined
          }
          onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
          slotProps={{
            input: {
              endAdornment: usernameStatus === "available" && (
                <InputAdornment position="end">
                  <Tooltip title={t("form.profile.username.available")}>
                    <CheckIcon color="success" />
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      rules={{
        required: t("form.profile.username.required"),
        validate: {
          noSpaces: (v) =>
            /^\S+$/.test(v) || t("form.profile.username.no_spaces"),
          minLength: (v) =>
            v.length >= 3 || t("form.profile.username.min_length"),
          maxLength: (v) =>
            v.length <= 32 || t("form.profile.username.max_length"),
          available: () =>
            usernameStatus !== "unavailable" ||
            t("form.profile.username.unavailable"),
        },
      }}
    />
  );
}
