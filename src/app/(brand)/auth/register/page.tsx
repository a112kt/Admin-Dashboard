"use client";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/context/authContext";
import { useTranslation } from "react-i18next";

import PageContainer from "@/components/ui/container/PageContainer";
import RegisterLayout from "@/features/brand/auth/register/components/RegisterLayout";
import StepAccountInfo from "@/features/brand/auth/register/components/StepAccountInfo";
import StepOtpVerification from "@/features/brand/auth/register/components/StepOtpVerification";
import StepBrandInfo from "@/features/brand/auth/register/components/StepBrandInfo";
import StepVerification from "@/features/brand/auth/register/components/StepVerification";
import StepSuccess from "@/features/brand/auth/register/components/StepSuccess";

export default function RegisterPage() {
  const { t } = useTranslation();
  const {
    step,
    setStep,
    setVerificationErrorState,
    setVerificationTimer,
  }: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setVerificationErrorState(false);
      setVerificationTimer(60);
    };
  }, []);

  const renderBack = (label: string) => (
    <Box
      onClick={() => setStep(step - 1)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
        mb: 2,
        color: "text.secondary",
        fontWeight: 500,
        fontSize: "13px",
        transition: "color 0.2s",
        "&:hover": { color: "primary.main" },
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Box>
  );

  return (
    <PageContainer title={t("Register Page")} description="Create your account">
      <RegisterLayout
        currentStep={step}
        totalSteps={5}
        onStepClick={(s) => {
          if (s < step) setStep(s);
        }}
      >
        {step >= 2 && step < 5 && renderBack("Back")}

        {step === 1 && (
          <StepAccountInfo onSuccess={() => setStep(2)} />
        )}
        {step === 2 && (
          <StepOtpVerification onSuccess={() => setStep(3)} />
        )}
        {step === 3 && (
          <StepBrandInfo onNext={() => setStep(4)} />
        )}
        {step === 4 && (
          <StepVerification onSuccess={() => setStep(5)} />
        )}
        {step === 5 && <StepSuccess />}
      </RegisterLayout>
    </PageContainer>
  );
}
