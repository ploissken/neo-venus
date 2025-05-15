"use client";
import { Grid, Step, StepLabel, Stepper, Theme } from "@mui/material";
import { useState } from "react";
import { IdentityStepContainer } from "./identity-step/IdentityStepContainer";
import { ProfileStepContainer } from "./profile-step/ProfileStepContainer";
import { FriendsFinderStep } from "./FriendsStep";
import { useRouter } from "next/navigation";

const steps = ["Identity Step", "Create your profile", "Add friends"];

export function SignUpContainer() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const handleSignupComplete = () => {
    router.push("/");
  };

  return (
    <Grid
      data-testid="sign-up-container"
      container
      direction="column"
      alignItems="center"
      size={12}
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        p: 2,
        m: 2,
      })}
    >
      <Grid
        data-testid="stepper-container"
        size={12}
        direction="column"
        sx={{ py: 4 }}
      >
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label} completed={false}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {activeStep === 0 && (
        <IdentityStepContainer
          onStepComplete={() => setActiveStep(activeStep + 1)}
        />
      )}
      {activeStep === 1 && (
        <ProfileStepContainer
          onStepComplete={() => setActiveStep(activeStep + 1)}
        />
      )}
      {activeStep === 2 && (
        <FriendsFinderStep onStepComplete={handleSignupComplete} />
      )}
    </Grid>
  );
}
