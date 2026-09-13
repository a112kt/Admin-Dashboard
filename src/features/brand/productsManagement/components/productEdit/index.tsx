"use client";
import { Button, Grid, Stack, Snackbar, Alert, CircularProgress } from "@mui/material";
import GeneralCard from "./GeneralCard";
import MediaCard from "./Media";
import VariationCard from "./VariationCard";
import PricingCard from "./Pricing";
import InformationManager from "../InformationManager";
import CustomersReviews from "./CustomersReviews";
import BlankCard from "@/components/shared/BlankCard";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import CategoryCard from "./CategoryCard";
import { useGetCategories, useGetProductById } from "../../hooks/productsHooks";
import { editProduct, uploadProductImages, deleteProductImage } from "../../services";
import type { Variation, EditProductReq, ProducctDetailRes, ProductImageDto, AvailableColor, AvailableSize, ProductInformationReq } from "../../types";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

interface FormErrors {
  title?: string;
  images?: string;
  category?: string;
}

const mapProductToVariations = (availableColors: AvailableColor[]): Variation[] =>
  availableColors.map((ac, idx) => ({
    id: idx,
    color: {
      value: String(ac.id),
      label: ac.name,
      sizes: ac.availableSizes.map((as) => ({
        value: String(as.id),
        label: as.size,
        quantity: String(as.quantity),
      })),
    },
  }));

const EcomEditProduct = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId: string }>();
  const { data: productRes, isSuccess: isProductLoaded } = useGetProductById(Number(productId));
  const { data: categoriesData, isSuccess: isCategoriesLoaded } = useGetCategories();
  const productData: ProducctDetailRes | undefined = productRes?.data;

  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingImages, setExistingImages] = useState<ProductImageDto[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const infoRef = useRef<{ getInformations: () => ProductInformationReq[] }>(null);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [discountType, setDiscountType] = useState<string>("no_discount");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [variations, setVariations] = useState<Variation[]>([]);

  useEffect(() => {
    if (isProductLoaded && productData) {
      setTitle(productData.name || "");
      setDescription(productData.description || "");
      setExistingImages(productData.mediaUrls || []);
      setRemovedImageIds([]);
      setCategoryId(String(productData.category?.id || ""));
      setBasePrice(productData.price || 0);
      setDiscountType(productData.haveOffer ? "percentage" : "no_discount");
      setDiscountValue(productData.discountPercentage || 0);
      setTotalPrice(productData.discountedPrice || productData.price || 0);
      setVariations(mapProductToVariations(productData.availableColors || []));
    }
  }, [isProductLoaded, productData]);

  useEffect(() => {
    let priceAfterDiscount = basePrice;
    if (discountType === "percentage") {
      priceAfterDiscount = basePrice - (basePrice * discountValue) / 100;
    }
    if (priceAfterDiscount < 0) priceAfterDiscount = 0;
    setTotalPrice(priceAfterDiscount);
  }, [basePrice, discountType, discountValue]);

  const handleRemoveExistingImage = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImageIds((prev) => [...prev, id]);
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
    open: false,
    severity: "success",
    message: "",
  });
  const snackbarAnchor = useSnackbarAnchor("bottom");

  const handleSave = async () => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Product title is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const productReq: EditProductReq = {
      productId: Number(productId),
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
      await editProduct(productReq);

      for (const imageId of removedImageIds) {
        await deleteProductImage(Number(productId), imageId);
      }

      if (newImages.length > 0) {
        await uploadProductImages(Number(productId), newImages);
      }

      setSnackbar({ open: true, severity: "success", message: "Product updated successfully!" });
      setTimeout(() => {
        router.push("/products-management/products");
      }, 1000);
    } catch (error) {
      console.error("Failed to update product", error);
      setSnackbar({ open: true, severity: "error", message: "Failed to update product. Please try again." });
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
              <GeneralCard title={title} setTitle={setTitle} titleError={errors.title} />
            </BlankCard>
            <BlankCard>
              <MediaCard existingImages={existingImages} onRemoveExistingImage={handleRemoveExistingImage} files={newImages} setFiles={setNewImages} />
            </BlankCard>
            <BlankCard>
              <VariationCard variations={variations} setVariations={setVariations} />
            </BlankCard>
            <BlankCard>
              <InformationManager ref={infoRef} initialInformations={productData?.productInformations} />
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
            {isCategoriesLoaded && (
              <BlankCard>
                <CategoryCard categories={categoriesData?.data || []} categoryId={categoryId} setCategoryId={setCategoryId} error={errors.category} />
              </BlankCard>
            )}
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

export default EcomEditProduct;
