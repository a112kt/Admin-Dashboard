"use client";

import { Box } from "@mui/material";

export default function SuccessCard() {
  return (
    <Box
      sx={{
        width: "375px",
        height: "812px",
        margin: "0 auto", // يخليه في النص
        borderRadius: "12px",
        background: "#F5F5F5",
        position: "relative",

        // الجريدينت البوردر
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "12px",
          padding: "1px",
          background:
            "linear-gradient(180deg, #47C0D2 0%, #1B2351 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
      }}
    >
      {/* جوا هنا هنحط باقي الصفحة بعدين */}
    </Box>
  );
}

