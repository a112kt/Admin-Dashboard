import * as Yup from "yup";

export const verificationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  nationalId: Yup.string()
    .required("National ID is required")
    .min(14, "National ID must be 14 digits")
    .max(14, "National ID must be 14 digits")
    .matches(/^[0-9]{14}$/, "National ID must be 14 digits"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(10|11|12|15)\d{8}$/, "Invalid phone number"),
  // frontId: Yup.mixed().required("Front ID is required"),
  // backId: Yup.mixed().required("Back ID is required"),
  // selfie: Yup.mixed().required("Selfie is required"),
});
