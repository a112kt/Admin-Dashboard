import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddIcon } from "../icons/icons";

type uploadImageProps = {
    value: File | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: boolean | undefined,
    helperText: string | undefined,
}
export default function UploadProfileImage({ value, onChange, error, helperText }: uploadImageProps) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);

        // Free memory when this component is unmounted or value changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    return (
        <label htmlFor="profile-upload">
            <Stack direction={"column"} alignItems={"center"} gap={1}>
                <Box
                    sx={{
                        width: "130px",
                        height: "130px",
                        position: "relative",
                        borderRadius: "50%",
                        // overflow: "hidden",
                        border: "2px solid",
                        borderColor: "transparent",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1.02)",
                            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                        },
                    }}
                >
                    {value ? (
                        <div
                            style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                                width: "130px",
                                height: "130px",
                            }}
                        >

                            <Image
                                src={preview ?? "/images/svgs/user-circle.svg"}
                                alt="Profile placeholder"
                                width={130}
                                height={130}
                                unoptimized
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    ) : (
                        <Box position={"relative"}>
                            <Box sx={{ position: "absolute", bottom: "0px", right: "0px", zIndex: "1" }}>
                                <AddIcon />
                            </Box>
                            <Image
                                src="/images/svgs/user-circle.svg"
                                alt="Profile placeholder"
                                width={130}
                                height={130}
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    )}
                </Box>
                <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            onChange(e);
                        }
                    }}
                    style={{ display: "none" }}
                />
                {error && <Typography variant="body2" color="error" mt={"2px"}>{helperText}</Typography>}
            </Stack>
        </label>
    )
}
