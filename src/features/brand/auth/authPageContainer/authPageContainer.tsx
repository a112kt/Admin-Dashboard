import { Box, Grid, Card, Typography, Stack } from "@mui/material";
import Shape from "@/../public/images/backgrounds/background-shape.png"

export default function AuthPageContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg, #1B2351 0%, #47C0D2 100%)",
                overflow: "hidden",
                borderRadius: "0px",
            }}
        >
            <Box
                component={"img"}
                src={Shape.src}
                sx={{
                    display: ["none", "none", "block"],
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    right: "0px",
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            ></Box>
            {children}
        </Box>
    )
}
