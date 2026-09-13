'use client'
import React, { useContext } from "react";
import { Box, useTheme, InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/context/customizerContext";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";

const Search = ({
    value,
    onChange,
    showIcon = true,
    placeholder = "Search…",
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showIcon?: boolean;
    placeholder?: string;
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { isBorderRadius } = useContext(CustomizerContext);
    return (
        <Box
        >
            <CustomTextField
                placeholder={placeholder || t('Search...')}
                value={value}
                onChange={onChange}
                variant="outlined"
                InputProps={{
                    startAdornment: showIcon && (
                        <InputAdornment position="start" sx={{ marginRight: 0 }}>
                            <Icon
                                icon="solar:magnifer-line-duotone"
                                width={16}
                                height={16}
                                style={{ color: theme.palette.text.primary }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    maxWidth: "300px",
                    padding: 0,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: `${isBorderRadius / 1.5}px`,
                        padding: "0px 8px",
                        "& .MuiInputBase-input": {
                            padding: "8px",
                        },
                    },
                }}
            />
        </Box>
    );
};

export default Search;
