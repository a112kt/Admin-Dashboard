"use client";
import { Box, Card } from "@mui/material";
import Image from "next/image";
import RegisterStepper from "./RegisterStepper";
import Footer from "@/components/layout/shared/footer/Footer";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  children: ReactNode;
}

export default function RegisterLayout({
  currentStep,
  totalSteps,
  onStepClick,
  children,
}: RegisterLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 680,
          mx: "auto",
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: { xs: 3, sm: 4 },
            pb: 0.5,
          }}
        >
          <Image
            src="/images/logo/mainLogo.svg"
            alt="logo"
            height={160}
            width={160}
            style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
          />
        </Box>

        <Box sx={{ px: { xs: 3, sm: 6 } }}>
          <RegisterStepper activeStep={currentStep - 1} onStepClick={onStepClick} />
        </Box>

        <Box sx={{ px: { xs: 3, sm: 6 }, pb: { xs: 3, sm: 4 }, pt: 1, minHeight: 480, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Card>

      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pb: { xs: 2 },
          px: { xs: 2 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 680 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
