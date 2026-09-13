import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Snackbar, Alert } from "@mui/material";
import Media from "./Media";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomSlider from "@/components/ui/forms/theme-elements/CustomSlider";
import { useCreateOffer } from "@/features/brand/productsManagement/hooks/productsHooks";
import dynamic from "next/dynamic";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const TiptapEditor = dynamic(
    () => import("@/components/ui/forms/form-tiptap/OptimizedTiptapEditor"),
    {
        ssr: false,
    }
);

interface ProductOfferProps {
    open: boolean;
    onClose: () => void;
    productIds: string[];
    onSuccess?: () => void;
}

export default function ProductOffer({ open, onClose, productIds, onSuccess }: ProductOfferProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [snackbar, setSnackbar] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
        open: false,
        severity: "success",
        message: "",
    });
    const createOfferMutation = useCreateOffer();
    const snackbarAnchor = useSnackbarAnchor("bottom");

    useEffect(() => {
        if (open) {
            setFiles([]);
            setDiscountValue(0);
            setDescription("");
        }
    }, [open]);

    const handleDiscountValueChange = (
        event: any,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            setDiscountValue(newValue[0]);
        } else {
            setDiscountValue(newValue);
        }
    };

    const handleSubmit = async () => {
        try {
            await createOfferMutation.mutateAsync({
                productIds,
                offerPrice: 0,
                description,
                discountPercentage: String(discountValue),
                images: files,
            });
            setSnackbar({ open: true, severity: "success", message: "Offer created successfully!" });
            setTimeout(() => {
                onClose();
                onSuccess?.();
            }, 1000);
        } catch {
            setSnackbar({ open: true, severity: "error", message: "Failed to create offer. Please try again." });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" >
            <DialogTitle> Create Today's Offer </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" mt={1}>Description *</Typography>
                <TiptapEditor maxLines={8} onChange={(html) => setDescription(html)} />

                <Media files={files} setFiles={setFiles} />
                <CustomFormLabel>
                    <Typography variant="subtitle1"> Set Discount Percentage *</Typography>
                </CustomFormLabel>
                <CustomSlider
                    aria-label="Volume"
                    value={discountValue}
                    onChange={handleDiscountValueChange}
                />
                <Typography variant="h6" mt={2}>
                    Discount Percentage : {`${discountValue}%`}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" disabled={createOfferMutation.isPending}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={createOfferMutation.isPending}>
                    {createOfferMutation.isPending ? "Creating..." : "Add Offer"}
                </Button>
            </DialogActions>
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
        </Dialog>
    )
}
