import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfilePictureUploadProps {
  value: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: string | undefined;
}

export default function ProfilePictureUpload({
  value,
  onChange,
  error,
  helperText,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

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
    <Stack direction="column" alignItems="center" spacing={1.5}>
      <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: "3px solid",
            borderColor: value ? "primary.main" : "rgba(27,35,81,0.12)",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
              "& .upload-overlay": {
                opacity: 1,
              },
            },
          }}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "rgba(27,35,81,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="rgba(27,35,81,0.25)"
                />
              </svg>
            </Box>
          )}
          <Box
            className="upload-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(27,35,81,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
          </Box>
        </Box>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          onChange={onChange}
          style={{ display: "none" }}
        />
      </label>
      <Typography
        variant="caption"
        sx={{
          color: error ? "error.main" : "text.secondary",
          fontWeight: 500,
          fontSize: "12px",
        }}
      >
        {error ? helperText : "Upload profile picture"}
      </Typography>
    </Stack>
  );
}
