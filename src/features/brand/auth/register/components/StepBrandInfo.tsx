"use client";
import { Box, Typography, Grid, CircularProgress, Button, Snackbar, Alert, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import SelectElement from "@/components/ui/inputFields/selectElement";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import { EarthIcon } from "@/components/ui/icons/icons";
import { useState, useEffect, useRef } from "react";
import GeneralInputField from "@/components/ui/inputFields/generalInputField";
import TextAreaField from "@/components/ui/inputFields/textAreaField";
import BrandLogoUpload from "./BrandLogoUpload";
import RichTextEditor from "./RichTextEditor";
import SectionHeader from "./SectionHeader";
import brandInfoSchema from "../schemas/brandInfoSchema";
import { useFormik } from "formik";
import { useGetCountriesOptions } from "../hooks/getLoctionOptions";
import { useGetCitiesOptions } from "../hooks/getLoctionOptions";
import { useGetCategoriesOptions } from "../hooks/getCategoriesOptions";
import { getUrl } from "@/API/globalFetcher";
import { useAddBrandInfo } from "../hooks/useRegister";
import { useTranslation } from "react-i18next";
import {
  loadPersistedData,
  saveData,
  fileToBase64,
  base64ToFile,
  isStepCompleted,
  markStepCompleted,
} from "../utils/registerPersistence";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

interface StepBrandInfoProps {
  onNext: () => void;
}

export default function StepBrandInfo({ onNext }: StepBrandInfoProps) {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "success" }>({ open: false, message: "", severity: "error" });
  const { mutate, errorMessage, isError } = useAddBrandInfo(() => {
    markCompletedAndNext();
  });
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReadOnly = isStepCompleted(3);
  const snackbarAnchor = useSnackbarAnchor("top");

  function markCompletedAndNext() {
    markStepCompleted(3);
    onNext();
    setIsPending(false);
  }

  const saved = loadPersistedData();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      brandName: saved?.step3?.brandName || "",
      numberOfEmployees: saved?.step3?.numberOfEmployees || "",
      brandLogo: saved?.step3?.brandLogo ? base64ToFile(saved.step3.brandLogo, "logo.png") : (null as File | null),
      category: saved?.step3?.category || "",
      country: saved?.step3?.country || "",
      city: saved?.step3?.city || "",
      district: saved?.step3?.district || "",
      aboutBrand: saved?.step3?.aboutBrand || "",
      brandPolicy: saved?.step3?.brandPolicy || "",
    },
    validationSchema: brandInfoSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      try {
        const logoBase64 = values.brandLogo ? await fileToBase64(values.brandLogo) : null;
        saveData({
          step3: {
            brandName: values.brandName,
            numberOfEmployees: values.numberOfEmployees,
            brandLogo: logoBase64,
            category: values.category,
            country: values.country,
            city: values.city,
            district: values.district,
            aboutBrand: values.aboutBrand,
            brandPolicy: values.brandPolicy,
          },
        });
        let logoUrl = "";
        if (values.brandLogo) {
          const response = await getUrl(values.brandLogo);
          if (response?.imageUrl) {
            logoUrl = response.imageUrl;
          } else {
            setIsPending(false);
            setSnackbar({ open: true, message: "Failed to upload logo image", severity: "error" });
            return;
          }
        }
        mutate({
          displayName: values.brandName,
          numberOfEmployees: Number(values.numberOfEmployees),
          logoUrl,
          description: values.aboutBrand,
          returnPolicyAsHtml: values.brandPolicy,
          category: values.category,
          country: values.country,
          governorate: values.city,
          district: values.district,
        });
      } catch (error: any) {
        setIsPending(false);
        const message = error?.response?.data?.errors?.[0]?.en || error.message || "Something went wrong";
        setSnackbar({ open: true, message, severity: "error" });
      }
    },
  });

  useEffect(() => {
    if (isError && errorMessage) {
      setIsPending(false);
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  }, [isError, errorMessage]);
  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(async () => {
      const logoBase64 = formik.values.brandLogo ? await fileToBase64(formik.values.brandLogo) : null;
      saveData({
        step3: {
          brandName: formik.values.brandName,
          numberOfEmployees: formik.values.numberOfEmployees,
          brandLogo: logoBase64,
          category: formik.values.category,
          country: formik.values.country,
          city: formik.values.city,
          district: formik.values.district,
          aboutBrand: formik.values.aboutBrand,
          brandPolicy: formik.values.brandPolicy,
        },
      });
    }, 2000);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [formik.values]);

  const employeesNumberOptions = [
    { value: "10", label: "1-10" },
    { value: "20", label: "21-30" },
    { value: "40", label: "31-40" },
    { value: "50", label: "41-50" },
    { value: "60", label: "more than 50" },
  ];

  const { countriesOptions, countriesIsError } = useGetCountriesOptions();
  const { citiesOptions, citiesIsError } = useGetCitiesOptions(formik.values.country);
  const { categoriesOptions, categoriesError } = useGetCategoriesOptions();

  useEffect(() => {
    formik.setFieldValue("city", "");
  }, [formik.values.country]);

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
            Step 3 — Completed
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
          {t("Brand Information")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "14px" }}>
          {t("Please provide the official details about your brand")}
        </Typography>
      </Box>

      <SectionHeader title="Brand Identity" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <BrandLogoUpload
            value={formik.values.brandLogo}
            setValue={(value) => formik.setFieldValue("brandLogo", value)}
            error={formik.touched.brandLogo && !!formik.errors.brandLogo}
            helperText={formik.errors.brandLogo}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <GeneralInputField
            name="brandName"
            type="text"
            value={formik.values.brandName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.brandName && !!formik.errors.brandName}
            helperText={formik.errors.brandName}
            label={t("BRAND NAME")}
            placeholder={t("Enter your brand name")}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectElement
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && !!formik.errors.category}
            helperText={formik.errors.category}
            options={categoriesOptions}
            placeholder={t("Select your category")}
            label={t("CATEGORY")}
            disabled={isReadOnly}
          />
          {categoriesError && !isReadOnly && (
            <Typography variant="caption" sx={{ color: "error.main", mt: 0.5, display: "block" }}>
              {t("Failed to load categories. Please refresh the page.")}
            </Typography>
          )}
        </Grid>
      </Grid>

      <SectionHeader title="Location" />
      {countriesIsError && !isReadOnly && (
        <Typography variant="caption" sx={{ color: "error.main", mb: 1, display: "block" }}>
          {t("Failed to load countries. Please refresh the page.")}
        </Typography>
      )}
      {citiesIsError && !isReadOnly && (
        <Typography variant="caption" sx={{ color: "error.main", mb: 1, display: "block" }}>
          {t("Failed to load cities. Please select a different country or refresh.")}
        </Typography>
      )}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectElement
            name="country"
            icon={<EarthIcon />}
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && !!formik.errors.country}
            helperText={formik.errors.country}
            options={countriesOptions}
            placeholder={t("Select your country")}
            label={t("COUNTRY")}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectElement
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && !!formik.errors.city}
            helperText={formik.errors.city}
            options={citiesOptions}
            placeholder={t("Select your city")}
            label={t("CITY")}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl sx={{ width: "100%", height: "100%", display: "flex", mt: 0.8, justifyContent: "start" }}>
            <Typography variant="h6" sx={{ color: "#1B2351", fontWeight: "500", fontSize: "14px", mb: 0.1 }}>
              {t("DISTRICT")}
            </Typography>
            <Box
              sx={{
                position: "relative",
                border: "1px solid",
                borderColor: formik.touched.district && formik.errors.district ? "red" : "#E5E7EB",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: "#1B2351",
                  boxShadow: "0 0 0 2px rgba(27, 35, 81, 0.1)",
                },
              }}
            >
              <OutlinedInput
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("Enter your district")}
                disabled={isReadOnly}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#1B2351",
                  px: "12px",
                }}
              />
            </Box>
            {formik.touched.district && formik.errors.district && (
              <FormHelperText sx={{ color: "red" }}>{formik.errors.district}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <SectionHeader title="Team" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectElement
            name="numberOfEmployees"
            value={formik.values.numberOfEmployees}
            onChange={formik.handleChange}
            error={formik.touched.numberOfEmployees && !!formik.errors.numberOfEmployees}
            helperText={formik.errors.numberOfEmployees}
            options={employeesNumberOptions}
            placeholder="Select range"
            label={t("NUMBER OF EMPLOYEES")}
            disabled={isReadOnly}
          />
        </Grid>
      </Grid>

      <SectionHeader title="Brand Story" />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={12}>
          <TextAreaField
            label={t("ABOUT BRAND")}
            placeholder={t("Tell us about your brand story, mission, and values...")}
            value={formik.values.aboutBrand}
            onChange={(e) => formik.setFieldValue("aboutBrand", e.target.value)}
            error={formik.touched.aboutBrand && !!formik.errors.aboutBrand}
            helperText={formik.errors.aboutBrand}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid size={12}>
          <RichTextEditor
            label={t("BRAND POLICY")}
            value={formik.values.brandPolicy}
            onChange={(html) => formik.setFieldValue("brandPolicy", html)}
            error={formik.touched.brandPolicy && !!formik.errors.brandPolicy}
            helperText={formik.errors.brandPolicy}
            placeholder={t("Describe your return policy and terms...")}
            disabled={isReadOnly}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 2,
          mb: 3,
          p: 2.5,
          borderRadius: "12px",
          bgcolor: "rgba(27,35,81,0.03)",
          border: "1px solid",
          borderColor: "rgba(27,35,81,0.08)",
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: "rgba(27,35,81,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1B2351" />
          </svg>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", fontSize: "13px", mb: 0.25 }}>
            {t("Almost There")}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.5, display: "block", fontSize: "12px" }}>
            Ensure all fields are accurate. This information will be used <strong>for your public profile and official documentation.</strong>
          </Typography>
        </Box>
      </Box>

      {!isReadOnly ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => formik.handleSubmit()}
              disabled={isPending}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {isPending ? (
                <CircularProgress size={24} sx={{ color: "black", p: "5px" }} />
              ) : (
                t("SUBMIT")
              )}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={onNext}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={snackbarAnchor}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
