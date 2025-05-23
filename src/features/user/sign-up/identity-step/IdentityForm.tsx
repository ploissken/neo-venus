import { useSnackbar } from "@/hooks";
import {
  BackendErrorResponse,
  BackendResponse,
  ProfileFormFields,
} from "@/lib";
import { Button, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

export type IdentityFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserResponse = {
  id: string;
  email: string;
};

export function IdentityForm({
  onIdentityCreated,
}: {
  onIdentityCreated: (user: UserResponse) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<IdentityFormInputs>({ mode: "onChange" });
  const password = useWatch({ control, name: "password" });
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useSnackbar();

  const onSubmit: SubmitHandler<IdentityFormInputs> = (data) => {
    setLoading(true);
    fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const fetchData: BackendResponse<UserResponse> | BackendErrorResponse =
          await response.json();
        if (fetchData.ok) {
          onIdentityCreated(fetchData.data);
        } else {
          showMessage(t(`form.identity.error.${fetchData.error}`), "error");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (password) {
      trigger(ProfileFormFields.ConfirmPassword);
    }
  }, [password, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        data-testid="identity-step-form"
        container
        size={12}
        direction="column"
        sx={{ gap: 2 }}
      >
        <TextField
          id="email"
          label={t("form.identity.email.label")}
          variant="outlined"
          type="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          {...register(ProfileFormFields.Email, {
            required: t("form.identity.email.required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("form.identity.email.helper"),
            },
          })}
        />
        <TextField
          id="password"
          label={t("form.identity.password.label")}
          variant="outlined"
          type="password"
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register(ProfileFormFields.Password, {
            required: t("form.identity.password.required"),
            pattern: {
              value: /^.{8,}$/,
              message: t("form.identity.password.helper"),
            },
          })}
        />
        <TextField
          id="confirm-password"
          label={t("form.identity.confirm_password.label")}
          variant="outlined"
          type="password"
          error={!!errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          {...register(ProfileFormFields.ConfirmPassword, {
            required: t("form.identity.confirm_password.required"),
            validate: (value) =>
              value === watch("password") ||
              t("form.identity.confirm_password.helper"),
          })}
        />
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          disabled={loading}
        >
          {t("form.identity.sign_up")}
        </Button>
      </Grid>
    </form>
  );
}
