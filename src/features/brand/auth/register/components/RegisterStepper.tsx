import { Box, Typography, useMediaQuery, Theme } from "@mui/material";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(71, 192, 210, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(71, 192, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(71, 192, 210, 0); }
`;

const fillLine = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const steps = [
  { label: "Account", subtitle: "Your details" },
  { label: "OTP", subtitle: "Verify email" },
  { label: "Brand Info", subtitle: "Business profile" },
  { label: "Verification", subtitle: "Identity check" },
  { label: "Success", subtitle: "All done" },
];

interface RegisterStepperProps {
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export default function RegisterStepper({ activeStep, onStepClick }: RegisterStepperProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Box sx={{ width: "100%", mb: 3 }}>
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          {steps.map((_, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                bgcolor: index < activeStep ? "secondary.main" : index === activeStep ? "primary.main" : "rgba(0,0,0,0.06)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "11px" }}>
          Step {activeStep + 1} of {steps.length} — {steps[activeStep].label}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isClickable = isCompleted || isActive;

          return (
            <Box
              key={index}
              onClick={() => isCompleted && onStepClick?.(index + 1)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
                cursor: isCompleted ? "pointer" : "default",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isActive
                    ? "primary.main"
                    : isCompleted
                      ? "secondary.main"
                      : "rgba(0,0,0,0.04)",
                  border: "2px solid",
                  borderColor: isActive
                    ? "secondary.main"
                    : isCompleted
                      ? "secondary.main"
                      : "rgba(0,0,0,0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: isActive ? `${pulse} 2s infinite` : "none",
                  "&:hover": isClickable
                    ? {
                        transform: "scale(1.1)",
                      }
                    : {},
                }}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7L5.5 10.5L12 4"
                      stroke="#1B2351"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: isActive ? "white" : "text.disabled",
                      lineHeight: 1,
                    }}
                  >
                    {index + 1}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  fontWeight: isActive || isCompleted ? 600 : 400,
                  fontSize: "11px",
                  color: isActive
                    ? "primary.main"
                    : isCompleted
                      ? "secondary.main"
                      : "text.disabled",
                  textAlign: "center",
                  lineHeight: 1.3,
                  transition: "color 0.3s",
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}

        {/* Individual connector segments — one between each adjacent pair */}
        {steps.slice(0, -1).map((_, index) => {
          const segmentCompleted = (index + 1) <= activeStep;
          return (
            <Box
              key={`connector-${index}`}
              sx={{
                position: "absolute",
                top: 18,
                left: `calc(${(index + 0.5) * (100 / steps.length)}% + 22px)`,
                width: `calc(${100 / steps.length}% - 44px)`,
                height: 2,
                borderRadius: 1,
                bgcolor: segmentCompleted ? "secondary.main" : "rgba(0,0,0,0.06)",
                zIndex: 0,
                transition: "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
