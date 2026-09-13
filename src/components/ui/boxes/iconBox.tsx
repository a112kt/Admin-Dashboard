import { Box } from "@mui/material";

export default function IconBox({ children, color, ...props }: { color?: string, children: React.ReactNode, [key: string]: any }) {
    return (
        <Box
            {...props}
            sx={{
                backgroundColor: color,
                padding: "6px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...props.sx
            }}
        >
            {children}
        </Box>
    );
}
