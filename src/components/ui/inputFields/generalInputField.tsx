import { Card, Box, Typography } from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import { SetStateAction } from "react";

type inputFieldProps = {
    name: string,
    label: string,
    type: "text" | "password" | "email" | "tel",
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: boolean | undefined,
    helperText: string | undefined,
    disabled: boolean,
    icon?: React.ReactNode,
    fixedString?: string,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    optional?: boolean,
    onFocus?: () => void,
}
export default function GeneralInputField({ name, label, type, placeholder, value, onChange, error, helperText, disabled, icon, fixedString, onBlur, optional = false, onFocus }: inputFieldProps) {
    return (
        <Box width={"100%"} mt={"0px"}>
            <Box width={"100%"}>
                <CustomFormLabel htmlFor={label}>{label}</CustomFormLabel>
                <CustomTextField
                    error={error}
                    type={type}
                    onFocus={onFocus}
                    name={name}
                    id={label}
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    InputProps={{
                        endAdornment: icon,
                        startAdornment: type === 'tel' ? <Typography sx={{ opacity: "0.75", fontSize: "16px", fontWeight: "700", color: "primary.main" }}>+20</Typography> : null
                    }}
                    disabled={disabled}
                />
            </Box>
            {error && <Typography variant="body2" color="error" mt={"1px"} sx={{ opacity: error ? 1 : 0 }}>{helperText}</Typography>}
        </Box>
    )
}
