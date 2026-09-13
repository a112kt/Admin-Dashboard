"use client";
import { Box, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { IDIcon, LampIcon } from "@/components/ui/icons/icons";
import Grid from "@mui/material/Grid";
import GeneralInputField from "@/components/ui/inputFields/generalInputField";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import SectionHeader from "./SectionHeader";
import VerificationImageUpload from "./VerificationImageUpload";
import { verificationSchema } from "../schemas/verificationSchema";
import { useVerifyIdentity } from "../hooks/useRegister";
import { useTranslation } from "react-i18next";
import {
  loadPersistedData,
  saveData,
  fileToBase64,
  base64ToFile,
  isStepCompleted,
  markStepCompleted,
} from "../utils/registerPersistence";

const tips = [
  "Ensure your face and the ID are both clearly visible and in focus.",
  "Avoid glares or reflections on the ID card surface",
  "Use a neutral, well-lit background with no other people present.",
];

interface StepVerificationProps {
  onSuccess: () => void;
}

export default function StepVerification({ onSuccess }: StepVerificationProps) {
  const { t } = useTranslation();
  const [showUpload, setShowUpload] = useState(false);
  const [idStep, setIdStep] = useState(0);
  const [errorStep, setErrorStep] = useState<"frontId" | "backId" | "selfie" | null>(null);
  const { mutate: verify, isPending, isError, errorMessage } = useVerifyIdentity(() => {
    markStepCompleted(4);
    onSuccess();
  });
  const isReadOnly = isStepCompleted(4);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saved = loadPersistedData();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      fullName: saved?.step4?.fullName || "",
      nationalId: saved?.step4?.nationalId || "",
      taxNumber: saved?.step4?.taxNumber || "",
      phone: saved?.step4?.phone || "",
      frontId: saved?.step4?.frontId ? base64ToFile(saved.step4.frontId, "front.png") : (null as File | null),
      backId: saved?.step4?.backId ? base64ToFile(saved.step4.backId, "back.png") : (null as File | null),
      selfie: saved?.step4?.selfie ? base64ToFile(saved.step4.selfie, "selfie.png") : (null as File | null),
    },
    validationSchema: verificationSchema,
    onSubmit: () => {
      setShowUpload(true);
    },
  });

  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(async () => {
      const frontBase64 = formik.values.frontId ? await fileToBase64(formik.values.frontId) : null;
      const backBase64 = formik.values.backId ? await fileToBase64(formik.values.backId) : null;
      const selfieBase64 = formik.values.selfie ? await fileToBase64(formik.values.selfie) : null;
      saveData({
        step4: {
          fullName: formik.values.fullName,
          nationalId: formik.values.nationalId,
          taxNumber: formik.values.taxNumber,
          phone: formik.values.phone,
          frontId: frontBase64,
          backId: backBase64,
          selfie: selfieBase64,
        },
      });
    }, 2000);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [formik.values]);

  function handleIdStep() {
    if (idStep === 0) {
      if (!formik.values.frontId) {
        setErrorStep("frontId");
        return;
      }
      setIdStep(1);
    } else if (idStep === 1) {
      if (!formik.values.backId) {
        setErrorStep("backId");
        return;
      }
      setIdStep(2);
    } else if (idStep === 2) {
      if (!formik.values.selfie) {
        setErrorStep("selfie");
        return;
      }
      handleIdSubmit();
    }
  }

  async function handleIdSubmit() {
    const frontBase64 = formik.values.frontId ? await fileToBase64(formik.values.frontId) : null;
    const backBase64 = formik.values.backId ? await fileToBase64(formik.values.backId) : null;
    const selfieBase64 = formik.values.selfie ? await fileToBase64(formik.values.selfie) : null;
    saveData({
      step4: {
        fullName: formik.values.fullName,
        nationalId: formik.values.nationalId,
        taxNumber: formik.values.taxNumber,
        phone: formik.values.phone,
        frontId: frontBase64,
        backId: backBase64,
        selfie: selfieBase64,
      },
    });
    verify(formik.values);
  }

  const uploadSteps = ["Front of National ID", "Back of National ID", "Selfie with ID"];
  const uploadKeys: Array<"frontId" | "backId" | "selfie"> = ["frontId", "backId", "selfie"];

  return (
    <Box>
      {isReadOnly && (
        <Box
          sx={{
            mb: 3,
            p: 1.5,
            borderRadius: "8px",
            bgcolor: "rgba(71,192,210,0.08)",
            border: "1px solid",
            borderColor: "secondary.main",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main", fontSize: "13px" }}>
            Step 4 — Completed
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 0.5,
            fontSize: { xs: "20px", sm: "24px" },
          }}
        >
          {t("Identity Verification")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "14px" }}>
          To ensure the integrity of <strong>ALLUVO</strong> ecosystem, please provide legal
          identification documents. Your data is encrypted.
        </Typography>
      </Box>

      {/* Identity Information */}
      <SectionHeader title="Legal Representative" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="fullName"
            type="text"
            value={formik.values.fullName}
            onChange={(e) => formik.setFieldValue("fullName", e.target.value)}
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={formik.errors.fullName}
            label={t("Full Name (As per ID)")}
            placeholder={t("Enter your full name")}
            disabled={isReadOnly}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={(e) => formik.setFieldValue("phone", e.target.value)}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.errors.phone}
            label={t("Phone Number")}
            placeholder={t("Enter your phone number")}
            disabled={isReadOnly}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="nationalId"
            type="text"
            value={formik.values.nationalId}
            onChange={(e) => formik.setFieldValue("nationalId", e.target.value)}
            error={formik.touched.nationalId && !!formik.errors.nationalId}
            helperText={formik.errors.nationalId}
            label={t("National ID Number")}
            placeholder={t("Enter your national ID number")}
            disabled={isReadOnly}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            optional={true}
            name="taxNumber"
            type="text"
            value={formik.values.taxNumber}
            onChange={(e) => formik.setFieldValue("taxNumber", e.target.value)}
            error={formik.touched.taxNumber && !!formik.errors.taxNumber}
            helperText={formik.errors.taxNumber}
            label={t("Tax Number")}
            placeholder={t("Enter your tax number")}
            disabled={isReadOnly}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>

      {/* ID Upload Section */}
      {!isReadOnly && !showUpload && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => formik.handleSubmit()}
              startIcon={<IDIcon fill="white" />}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {t("Continue to ID Upload")}
            </Button>
          </Box>
        </Box>
      )}

      {!isReadOnly && showUpload && (
        <Stack spacing={2.5}>
          {/* Tips card */}
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: "rgba(27,35,81,0.1)",
            }}
          >
            <Box sx={{ bgcolor: "#1B2351", px: 2.5, py: 2 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor: "rgba(71,192,210,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <LampIcon />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "white", fontSize: "14px" }}>
                    {t("Selfie Verification Tips")}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                    Follow these for a smooth verification
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ px: 2.5, py: 2, bgcolor: "rgba(27,35,81,0.02)" }}>
              <Stack spacing={1.5}>
                {tips.map((tip, index) => (
                  <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                    <Box
                      sx={{
                        mt: "1px",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "rgba(71,192,210,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#47C0D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px", lineHeight: 1.5 }}>
                      {tip}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Upload progress */}
          <Box display="flex" alignItems="center" gap={1.5}>
            {uploadSteps.map((step, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  bgcolor:
                    i < idStep ? "secondary.main" : i === idStep ? "primary.main" : "rgba(0,0,0,0.06)",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" fontWeight={600} color="primary.main">
              Step {idStep + 1} of 3
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {uploadSteps[idStep]}
            </Typography>
          </Box>

          {/* Upload area */}
          <VerificationImageUpload
            value={formik.values[uploadKeys[idStep]]}
            setValue={(file) => formik.setFieldValue(uploadKeys[idStep], file)}
            type={uploadKeys[idStep]}
            label={uploadSteps[idStep]}
            hasError={errorStep === uploadKeys[idStep]}
            onClearError={() => setErrorStep(null)}
          />

          {/* Error message */}
          {isError && errorMessage && (
            <Typography variant="body2" color="error" fontWeight={500}>
              {errorMessage}
            </Typography>
          )}

          {/* Next / Submit button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleIdStep}
                disabled={isPending}
                sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
              >
                {isPending ? (
                  <CircularProgress size={24} sx={{ color: "black", p: "5px" }} />
                ) : (
                  idStep === 2 ? t("SUBMIT") : t("Next")
                )}
              </Button>
            </Box>
          </Box>
        </Stack>
      )}

      {isReadOnly && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={onSuccess}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
