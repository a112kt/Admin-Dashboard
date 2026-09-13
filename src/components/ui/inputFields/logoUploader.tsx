import { Box, Typography, Card, Button } from "@mui/material";
import UploadIcon from "../icons/icons";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Uploader({ value, setValue, error, helperText }: { value: File | null, setValue: (value: File | null) => void, error: boolean | undefined, helperText: string | undefined }) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(file);
        }
    };

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
        <Box>
            <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: "200px",
                        width: "76%",
                        mx: "auto",
                        borderRadius: "4px",
                        "&:hover .hover-overlay": {
                            opacity: 1,
                        },
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#1C1C18", fontWeight: "500", fontSize: "14px", mb: "4px" }}>BRAND IDENTITY</Typography>

                    {!preview ? (
                        <Card
                            sx={{
                                bgcolor: "#E5E2DB4D",
                                height: "180px",
                                borderRadius: "4px",
                                border: "dashed 2px ",
                                borderColor: error ? "red" : "#0000001A",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <UploadIcon />
                            <Typography variant="h6" sx={{ color: "#1C1C18", fontWeight: "500", fontSize: "14px" }}>
                                Upload brand mark
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#1C1C18", fontWeight: "400", fontSize: "11px" }}>
                                SVG, PNG, or JPG (min. 400x400px)
                            </Typography>
                            {error && <Typography variant="body2" color="error" mt={"2px"}>{helperText}</Typography>}
                        </Card>
                    ) : (
                        <>
                            <Box sx={{ height: "100%", width: "50%", position: "relative", mx: "auto" }}>
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    style={{ objectFit: "cover", borderRadius: "4px" }}
                                    unoptimized
                                />
                                <Box
                                    className="hover-overlay"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: "rgba(255, 255, 255, 0.4)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: 0,
                                        transition: "opacity 0.3s ease",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <UploadIcon />
                                    <Typography variant="h6" sx={{ color: "#1C1C18", fontWeight: "500", fontSize: "14px" }}>
                                        Replace logo
                                    </Typography>

                                </Box>
                            </Box>

                        </>
                    )}
                </Box>
                <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </label>
        </Box>
    );
}
