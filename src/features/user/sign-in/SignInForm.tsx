import { useUser } from "@/context";
import { useSnackbar } from "@/hooks";
import { ProfileFormFields } from "@/lib";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type SignInFormInputs = {
  email: string;
  password: string;
};

export function SignInForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({ mode: "onChange" });

  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useSnackbar();
  const router = useRouter();
  const { signIn } = useUser();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    setLoading(true);
    const response = await signIn(data);

    if (response.ok) {
      router.push("/");
    } else {
      showMessage(t(`form.identity.error.${response.error}`), "error");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ width: "100%" }}
    >
      <Grid
        data-testid="sign-in-form"
        container
        size={12}
        direction="column"
        sx={{ gap: 2 }}
      >
        <Typography variant="h4">{t("form.identity.sign_in_title")}</Typography>
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
          })}
        />
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          disabled={loading}
        >
          {t("form.identity.sign_in")}
        </Button>
      </Grid>
    </form>
  );
}
