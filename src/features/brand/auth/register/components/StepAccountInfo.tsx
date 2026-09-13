"use client";
import { useFormik } from "formik";
import { Box, Grid, Typography, Stack, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import GeneralInputField from "@/components/ui/inputFields/generalInputField";
import BirthDatePicker from "@/components/ui/inputFields/datePicker";
import GenderField from "@/components/ui/inputFields/genderField";
import { EyeHideIcon, EyeIcon } from "@/components/ui/icons/icons";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload";
import SectionHeader from "./SectionHeader";
import PasswordStrengthBar from "./PasswordStrengthBar";
import { userInfoSchema } from "../schemas/userInfoSchema";
import dayjs, { Dayjs } from "dayjs";
import { useRegister } from "../hooks/useRegister";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  loadPersistedData,
  saveData,
  isStepCompleted,
  markStepCompleted,
  clearData,
  fileToBase64,
  base64ToFile,
} from "../utils/registerPersistence";

interface StepAccountInfoProps {
  onSuccess: () => void;
}

export default function StepAccountInfo({ onSuccess }: StepAccountInfoProps) {
  const { t } = useTranslation();
  const { setEmail, resetRegistration } = useContext(AuthContext);
  const [seen, setSeen] = useState(false);
  const [outerErrorMessage, setOuterErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { mutateAsync: register, isPending, errorMessage, isError } = useRegister(callBackOnSuccess);
  const isReadOnly = isStepCompleted(1);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saved = loadPersistedData();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      firstName: saved?.step1?.firstName || "",
      lastName: saved?.step1?.lastName || "",
      email: saved?.step1?.email || "",
      phone: saved?.step1?.phone || "",
      password: saved?.step1?.password || "",
      confirmPassword: saved?.step1?.confirmPassword || "",
      birthDate: saved?.step1?.birthDate ? dayjs(saved.step1.birthDate) : null,
      gender: saved?.step1?.gender || "",
      profileImage: saved?.step1?.profileImage ? base64ToFile(saved.step1.profileImage, "profile.png") : (null as File | null),
    },
    validationSchema: userInfoSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsDisabled(true);
      const profileBase64 = values.profileImage ? await fileToBase64(values.profileImage) : null;
      saveData({
        step1: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
          birthDate: values.birthDate ? (values.birthDate as unknown as string) : null,
          gender: values.gender,
          profileImage: profileBase64,
        },
      });
      await register(values);
    },
  });

  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(async () => {
      const profileBase64 = formik.values.profileImage ? await fileToBase64(formik.values.profileImage) : null;
      saveData({
        step1: {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          phone: formik.values.phone,
          password: formik.values.password,
          confirmPassword: formik.values.confirmPassword,
          birthDate: formik.values.birthDate ? (formik.values.birthDate as unknown as string) : null,
          gender: formik.values.gender,
          profileImage: profileBase64,
        },
      });
    }, 2000);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [formik.values]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    formik.setFieldValue("phone", value);
  };

  const handleBirthDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("birthDate", value, true);
    formik.setFieldTouched("birthDate", true, false);
  };

  function callBackOnSuccess() {
    markStepCompleted(1);
    setEmail(formik.values.email);
    onSuccess();
  }

  useEffect(() => {
    setIsDisabled(false);
  }, [isError]);

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
            Step 1 — Completed
          </Typography>
        </Box>
      )}

      {/* Profile Picture */}
      <Box sx={{ mb: 3 }}>
        <ProfilePictureUpload
          value={formik.values.profileImage}
          onChange={(e) => formik.setFieldValue("profileImage", e.target.files?.[0])}
          error={formik.touched.profileImage && !!formik.errors.profileImage}
          helperText={formik.errors.profileImage as string}
        />
      </Box>

      {/* Personal Details */}
      <SectionHeader title="Personal Details" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="firstName"
            label={t("First Name")}
            type="text"
            placeholder={t("First Name")}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.errors.firstName}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="lastName"
            label={t("Last Name")}
            type="text"
            placeholder={t("Last Name")}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.errors.lastName}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="phone"
            label={t("Phone")}
            type="tel"
            placeholder={t("e.g 10xxxxxxxx")}
            value={formik.values.phone}
            onChange={handlePhoneChange}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.errors.phone}
            disabled={isReadOnly}
            fixedString="+20"
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="email"
            label={t("Email")}
            type="email"
            placeholder={t("Email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.errors.email}
            disabled={isReadOnly}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>

      {/* Security */}
      <SectionHeader title="Security" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="password"
            label={t("Password")}
            type={seen && !isReadOnly ? "text" : "password"}
            placeholder={isReadOnly ? "••••••••" : t("Password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onFocus={() => formik.setFieldTouched("password", true)}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.errors.password}
            disabled={isReadOnly}
            icon={
              !isReadOnly && (
                seen ? (
                  <EyeHideIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeen(false)}
                  />
                ) : (
                  <EyeIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeen(true)}
                  />
                )
              )
            }
          />
          {!isReadOnly && <PasswordStrengthBar password={formik.values.password} />}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="confirmPassword"
            label={t("Confirm Password")}
            type={seen && !isReadOnly ? "text" : "password"}
            placeholder={isReadOnly ? "••••••••" : t("Confirm Password")}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.errors.confirmPassword}
            disabled={isReadOnly}
            icon={
              !isReadOnly && (
                seen ? (
                  <EyeHideIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeen(false)}
                  />
                ) : (
                  <EyeIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeen(true)}
                  />
                )
              )
            }
          />
        </Grid>
      </Grid>

      {/* Additional Info */}
      <SectionHeader title="Additional Info" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <BirthDatePicker
            value={formik.values.birthDate}
            onChange={handleBirthDateChange}
            error={formik.touched.birthDate && !!formik.errors.birthDate}
            helperText={formik.errors.birthDate}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GenderField
            selectedGender={formik.values.gender}
            setSelectedGender={(val) => {
              formik.setFieldValue("gender", val);
            }}
            error={formik.touched.gender && !!formik.errors.gender}
            helperText={formik.errors.gender}
            disabled={isReadOnly}
          />
        </Grid>
      </Grid>

      {/* Error */}
      {isError && errorMessage && (
        <Typography
          color="error"
          variant="body2"
          sx={{ textAlign: "center", mt: 2, fontWeight: 500 }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* Submit */}
      {!isReadOnly ? (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => formik.handleSubmit()}
              disabled={isDisabled}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {isPending ? (
                <CircularProgress size={24} sx={{ color: "black", p: "5px" }} />
              ) : (
                t("Create Account")
              )}
            </Button>
          </Box>
        </Box>
      ) : (
        <>
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
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Button
                variant="text"
                size="small"
                fullWidth
                onClick={() => setResetDialogOpen(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "text.secondary",
                  "&:hover": { color: "white" },
                }}
              >
                {t("Create account with another email")}
              </Button>
            </Box>
          </Box>
        </>
      )}

      {!isReadOnly && (
        <Stack direction="row" spacing={1} mt={3} justifyContent="center">
          <Typography color="textSecondary" variant="h6" fontWeight="500">
            {t('Already have an account?')}
          </Typography>
          <Typography
            component={Link}
            href="/auth/login"
            fontWeight="500"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            {t('Back to login')}
          </Typography>
        </Stack>
      )}

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t("Start a new registration?")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("This will discard your current registration progress and any pending OTP verification. You will be returned to the first step to create a new account.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="inherit">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => {
              clearData();
              resetRegistration();
              setResetDialogOpen(false);
            }}
            color="primary"
            variant="contained"
          >
            {t("Start Again")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
