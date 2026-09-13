import * as Yup from "yup";

export const userInfoSchema = Yup.object().shape({
      firstName: Yup.string()
        .required("First name is required")
        .min(3, "First name must be lmore than 3 chrs."),
      lastName: Yup.string()
        .required(`Last name is required`)
        .min(3, "username must be lmore than 3 chrs."),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^(10|11|12|15)\d{8}$/, "Invalid phone number"),
      email: Yup.string().required(`Email Is Required`).email(`Invalid Email`),
      password: Yup.string()
        .required("Password is required")
        .min(7, "Password must be at least 7 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one digit")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character",
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      birthDate: Yup.mixed().nullable().required("Your birth date is required!"),
      profileImage: Yup.mixed().required("Profile picture URL is required"),
      gender: Yup.string().required("Gender is required"),
    });