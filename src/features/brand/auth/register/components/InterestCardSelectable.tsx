import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const pulseIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
`;

const iconMap: Record<string, string> = {
  fashion: "👗",
  tech: "📱",
  art: "🎨",
  food: "🍔",
  home: "🏠",
  books: "📚",
  fitness: "🏋️",
  music: "🎵",
  travel: "✈️",
  beauty: "💄",
  sports: "⚽",
  gaming: "🎮",
  health: "💊",
  finance: "💰",
  education: "📖",
  nature: "🌿",
};

function getIcon(name: string): string {
  const key = name.toLowerCase().trim();
  if (iconMap[key]) return iconMap[key];
  for (const [k, v] of Object.entries(iconMap)) {
    if (key.includes(k)) return v;
  }
  return "⭐";
}

interface InterestCardSelectableProps {
  id: number;
  name: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function InterestCardSelectable({
  id,
  name,
  isSelected,
  onToggle,
}: InterestCardSelectableProps) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: 2.5,
        borderRadius: "12px",
        cursor: "pointer",
        userSelect: "none",
        bgcolor: isSelected ? "rgba(71, 192, 210, 0.08)" : "background.paper",
        border: "2px solid",
        borderColor: isSelected ? "secondary.main" : "rgba(0,0,0,0.06)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: isSelected ? `${pulseIn} 0.3s ease` : "none",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isSelected
            ? "0 8px 25px rgba(71, 192, 210, 0.2)"
            : "0 8px 25px rgba(0,0,0,0.08)",
          borderColor: isSelected ? "secondary.main" : "primary.main",
        },
        "&:active": {
          transform: "translateY(0) scale(0.98)",
        },
      }}
    >
      {isSelected && (
        <Box
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `${pulseIn} 0.3s ease`,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5L4 7L8 3"
              stroke="#1B2351"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      )}
      <Typography variant="h4" sx={{ fontSize: "28px", lineHeight: 1 }}>
        {getIcon(name)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: isSelected ? 700 : 500,
          color: isSelected ? "primary.main" : "text.secondary",
          textAlign: "center",
          fontSize: "13px",
          transition: "color 0.2s",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
