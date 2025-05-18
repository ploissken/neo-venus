"use client";
import {
  Box,
  Fade,
  Grid,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Theme,
} from "@mui/material";
import { useState } from "react";
import { IdentityStepContainer } from "./identity-step/IdentityStepContainer";
import { ProfileStepContainer } from "./profile-step/ProfileStepContainer";
import { FriendsFinderStep } from "./FriendsStep";
import { useRouter } from "next/navigation";

const steps = ["Identity Step", "Create your profile", "Add friends"];

export function SignUpContainer() {
  const TRANSITION_DURATION = 200;
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleNext = () => {
    setDirection("right");
    setShow(false);
    setTimeout(() => {
      setDirection("left");
      setActiveStep(activeStep + 1);
      setShow(true);
    }, TRANSITION_DURATION + 50);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <IdentityStepContainer onStepComplete={handleNext} />;
      case 1:
        return <ProfileStepContainer onStepComplete={handleNext} />;
      case 2:
        return <FriendsFinderStep onStepComplete={() => router.push("/")} />;
      default:
        return null;
    }
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
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "50vh", overflow: "hidden" }}
      >
        <Slide
          direction={direction}
          in={show}
          appear={false}
          timeout={TRANSITION_DURATION}
        >
          <Box sx={{ width: "100%" }}>
            <Fade in={show} appear={false} timeout={TRANSITION_DURATION}>
              <Box>{renderStep()}</Box>
            </Fade>
          </Box>
        </Slide>
      </Grid>
    </Grid>
  );
}
