import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";

interface VerificationImageUploadProps {
  value: File | null;
  setValue: (value: File | null) => void;
  type: "frontId" | "backId" | "selfie";
  label: string;
  hasError: boolean;
  onClearError: () => void;
  disabled?: boolean;
}

export default function VerificationImageUpload({
  value,
  setValue,
  type,
  label,
  hasError,
  onClearError,
  disabled = false,
}: VerificationImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setValue(file);
    }
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
    onClearError();
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "primary.main",
          mb: 1,
          fontSize: "13px",
        }}
      >
        {label}
      </Typography>
      <label
        htmlFor={disabled ? "" : `upload-${type}`}
        style={{ cursor: disabled ? "default" : "pointer", display: "block" }}
        onDrop={disabled ? undefined : handleDrop}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
      >
        <Box
          sx={{
            position: "relative",
            height: 180,
            borderRadius: "12px",
            border: "2px dashed",
            borderColor: hasError
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
              <Image
                src={preview}
                alt={label}
                fill
                style={{ objectFit: "contain", padding: 8 }}
                unoptimized
              />
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
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                style={{ opacity: 0.4, marginBottom: 8 }}
              >
                <path
                  d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"
                  fill="#1B2351"
                />
              </svg>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Drop or click to upload
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", mt: 0.5 }}
              >
                PNG, JPG up to 10MB
              </Typography>
            </>
          )}
        </Box>
      </label>
      {!disabled && (
        <input
          type="file"
          id={`upload-${type}`}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      )}
      {hasError && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, display: "block", fontWeight: 500 }}
        >
          Please upload this image
        </Typography>
      )}
    </Box>
  );
}
