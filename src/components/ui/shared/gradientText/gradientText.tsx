import { Typography } from "@mui/material";
import React from "react";

interface Props {
  text: string;
  fontSize?: number | string;
}

export default function GradientText({ text, fontSize = 48 }: Props) {
  return (
    <Typography
      component="div"
      sx={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1.2,
        background: "linear-gradient(90deg, #1B2351 0%, #47C0D2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        width: "fit-content", 
      }}
    >
      {text}
    </Typography>
  );
}