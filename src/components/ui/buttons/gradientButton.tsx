import { Button } from "@mui/material";

type gradientButtonProps = {
    onClick: () => void,
    disabled: boolean,
    borderRadius?: string,
    children?: React.ReactNode,
    width?: string,
    height?: string,
    state?: "primary" | "danger"
}
function GradientBg(state: "primary" | "danger") {
    if (state === "primary") {
        return "linear-gradient(90deg, #1B2351 0%, #47C0D2 100%)";
    } else {
        return "linear-gradient(90deg, #892727 , #EF4444)";
    }
}


function GradientShadow(state: "primary" | "danger") {
    if (state === "primary") {
        return "0px 4px 10px rgba(0, 0, 0, 0.2)";
    } else {
        return "0px 4px 10px rgba(182, 75, 75, 0.2)";
    }
}
function GradientOpacity(state: "primary" | "danger") {
    if (state === "primary") {
        return "linear-gradient(90deg, #47C0D2 0%, #1B2351 100%)";
    } else {
        return "linear-gradient(90deg, #892727 10%, #EF4444 60%)";
    }
}

export default function GradientButton({ onClick, disabled, borderRadius, children, width, height, state = "primary" }: gradientButtonProps) {
    return (
        <Button
            disableRipple
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
                width: width || "100%",
                height: height || "100%",
                borderRadius: borderRadius || "10px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: disabled ? "not-allowed" : "pointer",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                background: GradientBg(state),
                boxShadow: GradientShadow(state),
                textTransform: "none",
                fontWeight: "600",
                fontSize: "16px",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: GradientOpacity(state),
                    opacity: 0,
                    zIndex: -1,
                    transition: "opacity 0.4s ease",
                },
                "&:hover": {

                    boxShadow: disabled ? "none" : "0px 8px 20px rgba(71, 192, 210, 0.4)",
                    "&::before": {
                        opacity: disabled ? 0 : 1,
                    },
                },
                "&:active": {
                    transform: "translateY(0) scale(0.98)",
                },
                "&:disabled": {
                    // background: "#D1D1D1",
                    color: "#999",
                    boxShadow: "none",
                    opacity: 0.7,
                }
            }}
        >
            {children}
        </Button>
    )
}
