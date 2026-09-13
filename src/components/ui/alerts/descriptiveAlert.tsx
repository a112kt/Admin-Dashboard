import { Alert, AlertTitle, Typography } from "@mui/material";

export default function DescriptiveAlert({ title, description, strongText, severity, sx }: { title: string, description: string, strongText: string, severity: "success" | "error" | "warning" | "info", sx?: any }) {
    return (
        <Alert variant="outlined" severity={severity} sx={{ ...sx }} >
            <AlertTitle>{title}</AlertTitle>
            <Typography variant="body2">{description} <strong>{strongText}</strong></Typography>
        </Alert>
    );
}
