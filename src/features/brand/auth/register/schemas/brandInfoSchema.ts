import * as yup from "yup";

 const brandInfoSchema = yup.object({
    brandName: yup.string().required("Brand name is required"),
    numberOfEmployees: yup.string().required("Number of employees is required"),
    category: yup.string().required("Category is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    district: yup.string().required("District is required"),
    aboutBrand: yup.string().required("About brand is required"),
    brandPolicy: yup.string().required("Brand policy is required"),
    brandLogo: yup.mixed().required("Brand logo is required"),
});
export default brandInfoSchema;