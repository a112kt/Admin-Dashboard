import { Box, Typography, Card } from "@mui/material";
import { useState, useEffect } from "react";
import UploadIcon from "../icons/icons";
import Image from "next/image";

type imageCardUploaderProps = {
    value: File | null,
    setValue: (value: File | null) => void,
    type: "frontId" | "backId" | "selfie",
    errorStep: "frontId" | "backId" | "selfie" | null,
    label: string,
    setErrorStep: (step: "frontId" | "backId" | "selfie" | null) => void,
}
export default function ImageCardUploader({ value, setValue, type, label, errorStep, setErrorStep }: imageCardUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    // function getTitle() {
    //     switch (type) {
    //         case "fid":
    //             return "frontID.png";
    //         case "bid":
    //             return "backID.png";
    //         case "selfie":
    //             return "screen.png";
    //     }
    // }


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
        setErrorStep(null);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);
    return (
        <Box width={"100%"} bgcolor={"#F6F3EC"} padding={"22px"} borderRadius={"8px"}>
            <label htmlFor={`upload-${type}`} style={{ cursor: "pointer" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: "200px",
                        width: { sm: "100%", md: "70%" },
                        mx: "auto",
                        borderRadius: "10px",


                        "&:hover .hover-overlay": {
                            opacity: 1,
                        },
                    }}
                >

                    {!preview ? (
                        <Box
                            sx={{
                                bgcolor: "#E5E2DB4D",
                                height: "90%",
                                borderRadius: "4px",
                                border: "dashed 2px ",
                                borderColor: errorStep === type ? "red" : "#0000001A",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                opacity: 0.8
                            }}>
                                <UploadIcon fill="#1C1C18" />
                                <Typography variant="h6" sx={{ color: "#1C1C18", fontWeight: "600", fontSize: "14px" }}>
                                    Upload Image
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ height: "90%", width: "100%", position: "relative", mx: "auto" }}>
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    style={{ objectFit: "contain", borderRadius: "4px" }}
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
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: 0,
                                        transition: "opacity 0.3s ease",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <UploadIcon fill="white" />
                                    <Typography variant="h6" sx={{ color: "white", fontWeight: "600", fontSize: "14px", mt: 0.5 }}>
                                        Replace image
                                    </Typography>
                                </Box>
                            </Box>

                        </>
                    )
                    }
                </Box >
                <Typography textAlign={"center"} variant="h5" sx={{ color: "#1C1C18", fontWeight: "600", mb: "4px" }}>{label}</Typography>
                {errorStep === type && <Typography variant="body2" textAlign={"center"} color="error" mt={"2px"}>Please upload the image</Typography>}
                <input
                    type="file"
                    id={`upload-${type}`}
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </label >
        </Box >
    )
}
