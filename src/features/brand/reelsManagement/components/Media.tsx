"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

import { Typography, Box, IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

const MAX_SIZE = 400 * 1024 * 1024;

function Media({ videoFile, setVideoFile }: { videoFile: File | null, setVideoFile: (videoFile: File | null) => void }) {
    // const [videoFile, setVideoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setVideoFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }, []);

    const onDropRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            const rejection = fileRejections[0];
            if (rejection) {
                const err = rejection.errors[0];
                if (err?.code === "file-too-large") {
                    setError("File is too large. Maximum size is 400MB.");
                } else if (err?.code === "file-invalid-type") {
                    setError("Invalid file type. Please upload a video file.");
                } else {
                    setError(err?.message ?? "File rejected.");
                }
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { "video/*": [] },
        maxSize: MAX_SIZE,
        maxFiles: 1,
    });

    const handleRemove = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setVideoFile(null);
        setPreviewUrl(null);
        setError(null);
    };

    useEffect(() => {
        if (!videoFile && previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    }, [videoFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <Box p={3}>
            <Typography variant="h5">Upload Reel </Typography>
            {error && (
                <Typography
                    variant="caption"
                    sx={{ color: "error.main", display: "block", mt: 1 }}
                >
                    {error}
                </Typography>
            )}
            {previewUrl ? (
                <Box
                    mt={3}
                    sx={{ position: "relative", display: "inline-block", width: "100%" }}
                >
                    <video
                        src={previewUrl}
                        controls
                        style={{ width: "100%", maxHeight: 400, borderRadius: 8 }}
                    />
                    <IconButton
                        onClick={handleRemove}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "red",
                            color: "white",
                            "&:hover": { bgcolor: "white", color: "red" },
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ) : (
                <Box
                    mt={3}
                    sx={{
                        backgroundColor: isDragActive ? "primary.main" : "primary.light",
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
                    <Box textAlign="center">
                        <Typography variant="body2" sx={{ color: "primary.main" }}>
                            Click to upload or drag and drop
                        </Typography>
                        <Typography variant="caption" sx={{ color: "primary.main" }}>
                            MP4, WebM, OGG, MOV, AVI, MKV (MAX. 400MB)
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Media