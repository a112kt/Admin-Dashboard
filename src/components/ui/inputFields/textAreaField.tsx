import { Card, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
type textAreaFieldProps = {
    label: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<any>) => void,
    error: boolean | undefined,
    helperText: string | undefined,
    disabled: boolean,
}
export default function TextAreaField({ label, placeholder, value, onChange, error, helperText, disabled }: textAreaFieldProps) {
    return (
        <Box width={"100%"}>
            <Typography variant="body1" sx={{ fontWeight: "300", color: "primary.main" }}>{label}</Typography>
            <Card sx={{ backgroundColor: disabled ? "#F5F5F5" : "#FFFFFF", padding: "0px", borderRadius: "7px", border: "1px solid ", borderColor: error ? "red" : "#0000001A", mb: "0px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    multiline
                    rows={4}
                    sx={{
                        width: "100%", height: "100%",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "500",
                        "& .MuiInputBase-root": {
                            borderRadius: "7px !important",
                            padding: "0px !important",
                        }
                    }} type={"text"} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
            </Card>
            {error && <Typography variant="body2" color="error" mt={"2px"}>{helperText}</Typography>}
        </Box>
    )
}
