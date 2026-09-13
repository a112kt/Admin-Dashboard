import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 7) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&#]/.test(password)) score += 1;

  if (score <= 1) return { score: 0.16, label: "Weak", color: "#EF4444" };
  if (score <= 2) return { score: 0.33, label: "Fair", color: "#F59E0B" };
  if (score <= 3) return { score: 0.5, label: "Good", color: "#3B82F6" };
  if (score <= 4) return { score: 0.66, label: "Strong", color: "#10B981" };
  return { score: 1, label: "Very Strong", color: "#059669" };
}

export default function PasswordStrengthBar({ password }: { password: string }) {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Box
        sx={{
          height: 4,
          borderRadius: 2,
          bgcolor: "rgba(0,0,0,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${strength.score * 100}%`,
            borderRadius: 2,
            bgcolor: strength.color,
            transition: "all 0.4s ease",
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          display: "block",
          color: strength.color,
          fontWeight: 500,
          fontSize: "11px",
        }}
      >
        Password strength: {strength.label}
      </Typography>
    </Box>
  );
}
