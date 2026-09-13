"use client";
import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import { IconButton, Typography, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import type { ProductImageDto } from "../../types";

interface MediaCardProps {
  existingImages?: ProductImageDto[];
  onRemoveExistingImage: (id: number) => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  error?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ existingImages = [], onRemoveExistingImage, files, setFiles, error }) => {
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Upload Media</Typography>
      <Box
        mt={3}
        sx={{
          backgroundColor: "primary.light",
          color: "primary.main",
          padding: "40px 30px",
          textAlign: "center",
          border: "1px dashed",
          borderColor: "primary.main",
          cursor: "pointer",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some images here, or click to select images</p>
      </Box>

      <Box mt={2}>
        {error && (
          <Typography variant="body2" color="error.main" mb={1}>
            {error}
          </Typography>
        )}

        {existingImages.length > 0 && (
          <>
            <Typography variant="body1" gutterBottom>
              Existing Images ({existingImages.length})
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
              {existingImages.map((img) => (
                <Box
                  key={img.id}
                  position="relative"
                  width={80}
                  height={80}
                  border={`1px solid ${theme.palette.divider}`}
                  borderRadius="10px"
                  overflow="hidden"
                >
                  <img
                    src={img.url}
                    alt={`existing-${img.id}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => onRemoveExistingImage(img.id)}
                    sx={{
                      position: "absolute",
                      padding: "2px",
                      top: 2,
                      right: 2,
                      backgroundColor: "blackColor.black20",
                      "&:hover": { backgroundColor: "blackColor.black40" },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </>
        )}

        {files.length > 0 && (
          <>
            <Typography variant="body1" gutterBottom>
              New Images ({files.length})
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {files.map((file) => {
                const preview = URL.createObjectURL(file);
                return (
                  <Box
                    key={file.name}
                    position="relative"
                    width={80}
                    height={80}
                    border={`1px solid ${theme.palette.divider}`}
                    borderRadius="10px"
                    overflow="hidden"
                  >
                    <img
                      src={preview}
                      alt={file.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeFile(file.name)}
                      sx={{
                        position: "absolute",
                        padding: "2px",
                        top: 2,
                        right: 2,
                        backgroundColor: "blackColor.black20",
                        "&:hover": { backgroundColor: "blackColor.black40" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </>
        )}

        {existingImages.length === 0 && files.length === 0 && (
          <Typography variant="body1" gutterBottom color="error">
            Images required!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MediaCard;
