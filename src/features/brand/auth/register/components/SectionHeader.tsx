import { Box, Typography, Divider } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "8px",
              bgcolor: "rgba(27, 35, 81, 0.08)",
              color: "primary.main",
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(0,0,0,0.06)" }} />
    </Box>
  );
}
