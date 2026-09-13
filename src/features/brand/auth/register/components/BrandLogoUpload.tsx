import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";

interface BrandLogoUploadProps {
  value: File | null;
  setValue: (value: File | null) => void;
  error: boolean | undefined;
  helperText: string | undefined;
  disabled?: boolean;
}

export default function BrandLogoUpload({
  value,
  setValue,
  error,
  helperText,
  disabled = false,
}: BrandLogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) setValue(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "primary.main", mb: 1, fontSize: "13px" }}
      >
        Brand Logo
      </Typography>
      <label
        htmlFor={disabled ? "" : "brand-logo-upload"}
        style={{ cursor: disabled ? "default" : "pointer", display: "block" }}
        onDrop={disabled ? undefined : handleDrop}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
      >
        <Box
          sx={{
            position: "relative",
            height: 160,
            borderRadius: "12px",
            border: "2px dashed",
            borderColor: error
              ? "error.main"
              : isDragOver
                ? "secondary.main"
                : preview
                  ? "primary.main"
                  : "rgba(0,0,0,0.1)",
            bgcolor: isDragOver
              ? "rgba(71, 192, 210, 0.05)"
              : preview
                ? "#F8F7F4"
                : "rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            overflow: "hidden",
            opacity: disabled ? 0.6 : 1,
            "&:hover": disabled ? {} : {
              borderColor: "primary.main",
              bgcolor: "rgba(27,35,81,0.03)",
            },
          }}
        >
          {preview ? (
            <>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={preview}
                  alt="Brand logo"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </Box>
              {!disabled && (
                <Box
                  className="hover-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(27,35,81,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Typography variant="body2" color="white" fontWeight={600}>
                    Tap to replace
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "rgba(27,35,81,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: 0.4 }}
                >
                  <path
                    d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"
                    fill="#1B2351"
                  />
                </svg>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Upload brand logo
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", mt: 0.25 }}
              >
                SVG, PNG, or JPG (min. 400x400px)
              </Typography>
            </>
          )}
        </Box>
      </label>
      {!disabled && (
        <input
          type="file"
          id="brand-logo-upload"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      )}
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, display: "block", fontWeight: 500 }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
