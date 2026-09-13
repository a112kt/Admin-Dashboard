import * as React from 'react';
import { useState, useLayoutEffect, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Typography } from '@mui/material';

type Props = {
    label?: string;
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    error: boolean | undefined;
    helperText: string | undefined;
    options: { value: string, label: string }[];
    icon?: React.ReactNode;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
}

export default function SelectElement({ name, label, value, onChange, error, helperText, options, icon, placeholder, disabled }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [wrapperWidth, setWrapperWidth] = useState<number>(0);

    useLayoutEffect(() => {
        if (wrapperRef.current) {
            setWrapperWidth(wrapperRef.current.offsetWidth);
        }
        
    }, []);

    return (
        <FormControl sx={{ m: 1, minWidth: 120, width: "100%", mx: "0px" }}>
            <Typography variant="h6" sx={{ color: "#1B2351", fontWeight: "500", fontSize: "14px" }}>
                {label}
            </Typography>
            <Box
                ref={wrapperRef}
                sx={{
                    position: "relative",
                    border: "1px solid",
                    borderColor: error ? "red" : "#E5E7EB",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:focus-within": {
                        borderColor: "#1B2351",
                        boxShadow: "0 0 0 2px rgba(27, 35, 81, 0.1)",
                    },
                }}
            >
                {icon && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            color: "#6B7280",
                            pointerEvents: "none",
                            zIndex: 1,
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Select
                    name={name}
                    disabled={disabled || options.length === 0}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={(selected) => {
                        if (selected === "" || selected == null || selected.length === 0) {
                            return <Box sx={{ color: "#9CA3AF", fontWeight: "400" }}>{placeholder}</Box>;
                        }
                        const selectedOption = options.find(opt => opt.value === selected);
                        return selectedOption?.label || selected;
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                width: wrapperWidth > 0 ? wrapperWidth : undefined,
                                marginTop: "4px",
                                borderRadius: "8px",
                                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                                "& .MuiMenuItem-root": {
                                    fontSize: "14px",
                                    padding: "10px 12px",
                                }
                            }
                        }
                    }}
                    sx={{
                        width: "100%",
                        backgroundColor: "transparent",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#1B2351",
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "& .MuiSelect-select": {
                            padding: icon ? "12px 12px 12px 40px" : "12px 12px",
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value || option.label} value={option.value || option.label}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            {error && <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>}
        </FormControl>
    );
}
