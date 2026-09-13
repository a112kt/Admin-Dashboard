"use client";
import { Typography, Box, Stack, Button } from "@mui/material";
import Link from "next/link";
import { keyframes } from "@emotion/react";
import { Grow, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { clearData } from "../utils/registerPersistence";
import {
  CompassIcon,
  MoneyIcon,
  ListIcon,
  LockIcon,
  WatchIcon,
  UploadIcon2,
  AddMember,
} from "@/components/ui/icons/icons";

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(71, 192, 210, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(71, 192, 210, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(71, 192, 210, 0); }
`;

const drawCheck = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function StepSuccess() {
  const { t } = useTranslation();

  useEffect(() => {
    clearData();
  }, []);

  return (
    <Box>
      <Stack alignItems="center" spacing={3} sx={{ textAlign: "center" }}>
        <Grow in={true} timeout={800}>
          <Box sx={{ animation: `${pulse} 2.5s infinite ease-in-out` }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1B2351 0%, #47C0D2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                boxShadow: "0 8px 32px rgba(71, 192, 210, 0.35)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #47C0D2 0%, #1B2351 100%)",
                  opacity: 0.3,
                  zIndex: -1,
                },
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="30"
                  strokeDashoffset="30"
                  style={{
                    animation: `${drawCheck} 0.6s ease forwards 0.3s`,
                  }}
                />
              </svg>
            </Box>
          </Box>
        </Grow>

        <Box sx={{ animation: `${fadeSlideUp} 0.6s ease forwards 0.5s`, opacity: 0 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 1,
              fontSize: { xs: "20px", sm: "24px" },
            }}
          >
            {t("Registration Is Under Review")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 460,
              mx: "auto",
              lineHeight: 1.7,
              fontSize: "14px",
            }}
          >
            Our curation team is currently reviewing your brand credentials. This
            typically takes 24-48 business hours to ensure community standards and
            data integrity.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          sx={{
            width: "100%",
            mt: 1,
            animation: `${fadeSlideUp} 0.6s ease forwards 0.7s`,
            opacity: 0,
          }}
        >
          {/* What You Can Do */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "14px",
              bgcolor: "rgba(27,35,81,0.02)",
              border: "1px solid",
              borderColor: "rgba(27,35,81,0.08)",
              textAlign: "left",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(27,35,81,0.06)",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2.5}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t("WHAT CAN YOU DO")}
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  bgcolor: "rgba(71,192,210,0.12)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "#47C0D2", fontSize: "10px", letterSpacing: "0.03em" }}
                >
                  {t("Active Now")}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <ActionItem
                icon={<CompassIcon fill="#1B2351" />}
                head={t("Browse Marketplace")}
                label="Explore trends and competitor benchmarks."
              />
              <ActionItem
                icon={<WatchIcon fill="#1B2351" />}
                head={t("Watch Brand Reels")}
                label="Learn from curated industry success stories."
              />
              <ActionItem
                icon={<ListIcon fill="#1B2351" />}
                head={t("Draft Content")}
                label="Prepare your assets while you wait."
              />
            </Stack>
          </Box>

          {/* Pending Approval */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "14px",
              bgcolor: "rgba(0,0,0,0.01)",
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.06)",
              textAlign: "left",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2.5}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t("PENDING APPROVAL")}
              </Typography>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "8px",
                  bgcolor: "rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LockIcon fill="#919193" />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <ActionItem
                icon={<UploadIcon2 fill="#919193" />}
                head={t("Publish Content")}
                label="Visibility is locked until verification is complete."
              />
              <ActionItem
                icon={<MoneyIcon fill="#919193" />}
                head={t("Manage Transactions")}
                label="Financial services require full brand approval."
              />
              <ActionItem
                icon={<AddMember fill="#919193" />}
                head={t("Add Team Members")}
                label="Permission management is disabled."
              />
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ mt: 4, animation: `${fadeSlideUp} 0.6s ease forwards 0.9s`, opacity: 0 }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, px: 5, borderRadius: "8px" }}
          >
            {t("To Dashboard")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function ActionItem({
  icon,
  head,
  label,
}: {
  icon: React.ReactNode;
  head: string;
  label: string;
}) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          bgcolor: "rgba(27,35,81,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "rgba(27,35,81,0.1)",
          },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "text.primary", fontSize: "13px", mb: 0.25 }}
        >
          {head}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontSize: "12px", lineHeight: 1.4, display: "block" }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  );
}
