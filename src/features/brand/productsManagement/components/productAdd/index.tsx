"use client";
import { Button, Grid, Stack, Snackbar, Alert, CircularProgress } from "@mui/material";
import GeneralCard from "./GeneralCard";
import MediaCard from "./Media";
import VariationCard from "./VariationCard";
import PricingCard from "./Pricing";
import Thumbnail from "./Thumbnail";
import InformationManager from "../InformationManager";
import ProductDetailsCard from "./ProductDetails";
import ProductTemplate from "./ProductTemplate";
import BlankCard from "@/components/shared/BlankCard";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CategoryCard from "./CategoryCard";
import { useGetCategories } from "../../hooks/productsHooks";
import { addProduct, uploadProductImages, deleteProduct } from "../../services";
import type { Variation, AddBrandProductReq, ProductInformationReq } from "../../types";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

interface FormErrors {
  title?: string;
  images?: string;
  category?: string;
}

const EcomAddProduct = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string>("");
  const { data: categories, isSuccess } = useGetCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const infoRef = useRef<{ getInformations: () => ProductInformationReq[] }>(null);

  const [basePrice, setBasePrice] = useState<number>(0);
  const [discountType, setDiscountType] = useState<string>("no_discount");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [variations, setVariations] = useState<Variation[]>([
    { id: Date.now(), color: { value: "", label: "", sizes: [{ value: "", label: "", quantity: "" }] } },
  ]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
    open: false,
    severity: "success",
    message: "",
  });
  const snackbarAnchor = useSnackbarAnchor("bottom");

  useEffect(() => {
    let priceAfterDiscount = basePrice;
    if (discountType === "percentage") {
      priceAfterDiscount = basePrice - (basePrice * discountValue) / 100;
    } else if (discountType === "fixed") {
      priceAfterDiscount = basePrice - discountValue;
    }
    if (priceAfterDiscount < 0) priceAfterDiscount = 0;
    setTotalPrice(priceAfterDiscount);
  }, [basePrice, discountType, discountValue]);

  const handleSave = async () => {
    const newErrors: FormErrors = {};
    if (!title.trim()) {
      newErrors.title = "Product title is required";
    }
    if (images.length === 0) {
      newErrors.images = "Please upload at least one product image";
    }
    if (!categoryId) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const productData: AddBrandProductReq = {
      name: title,
      description,
      price: basePrice,
      categoryId: Number(categoryId),
      isCustomizable: false,
      discountPercentage: discountValue,
      colors: variations
        .filter((v) => v.color.value)
        .map((v) => ({
          productColorId: Number(v.color.value),
          sizes: v.color.sizes
            .filter((s) => s.value && s.quantity)
            .map((s) => ({
              productSizeId: Number(s.value),
              quantity: Number(s.quantity),
            })),
        })),
      informations: infoRef.current?.getInformations() || [],
    };

    try {
      const { data: productId } = await addProduct(productData);
      try {
        if (images.length > 0) {
          await uploadProductImages(productId, images);
        }
      } catch (imageError) {
        await deleteProduct(productId);
        throw new Error("Failed to upload images. The product has been removed.");
      }
      setSnackbar({ open: true, severity: "success", message: "Product added successfully!" });
      setTimeout(() => {
        router.push("/products-management/products");
      }, 1000);
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (error: any) {
      console.error("Failed to add product", error);
      setSnackbar({ open: true, severity: "error", message: error?.message || "Failed to add product. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid size={{ lg: 8 }}>
          <Stack spacing={3}>
            <BlankCard>
              <GeneralCard title={title} setTitle={setTitle} titleError={errors.title} description={description} setDescription={setDescription} />
            </BlankCard>
            <BlankCard>
              <MediaCard files={images} setFiles={setImages} error={errors.images} />
            </BlankCard>
            <BlankCard>
              <VariationCard variations={variations} setVariations={setVariations} />
            </BlankCard>
            <BlankCard>
              <InformationManager ref={infoRef} />
            </BlankCard>
            <BlankCard>
              <PricingCard
                basePrice={basePrice}
                setBasePrice={setBasePrice}
                discountType={discountType}
                setDiscountType={setDiscountType}
                discountValue={discountValue}
                setDiscountValue={setDiscountValue}
                totalPrice={totalPrice}
              />
            </BlankCard>
          </Stack>
        </Grid>
        <Grid size={{ lg: 4 }}>
          <Stack spacing={3}>
            {isSuccess && (
              <BlankCard>
                <CategoryCard categories={categories?.data || []} setCategoryId={setCategoryId} error={errors.category} />
              </BlankCard>)}
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={snackbarAnchor}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EcomAddProduct;
