import { Box, Typography } from "@mui/material";

const MaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="7" r="4" />
    <path d="M5 12 C5 18, 10 22, 12 22 C14 22, 19 18, 19 12" />
  </svg>
);

export default function GenderField({ selectedGender, setSelectedGender, error, helperText, disabled }: { selectedGender: string, setSelectedGender: (gender: string) => void, error: boolean | undefined, helperText: string | undefined, disabled?: boolean }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontWeight: 600, color: "text.primary", fontSize: "16px", mb: "5px", mt: "25px" }}>
        Gender
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {["male", "female"].map((gender) => {
          const isSelected = selectedGender === gender;
          return (
            <Box
              key={gender}
              onClick={() => !disabled && setSelectedGender(gender)}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 1.5,
                px: 2,
                borderRadius: "12px",
                border: isSelected ? "none" : "1px solid",
                borderColor: "divider",
                bgcolor: isSelected ? "primary.main" : "transparent",
                color: isSelected ? "common.white" : (disabled ? "text.disabled" : "text.secondary"),
                boxShadow: isSelected && !disabled ? "0 2px 8px rgba(99,102,241,0.3)" : "none",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled && !isSelected ? 0.5 : 1,
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": disabled || isSelected ? {} : {
                  borderColor: "primary.light",
                  bgcolor: "action.hover",
                },
              }}
            >
              {gender === "male" ? <MaleIcon /> : <FemaleIcon />}
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.01em",
                  color: "inherit",
                }}
              >
                {gender === "male" ? "Male" : "Female"}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {error && <Typography variant="body2" color="error" sx={{ fontSize: "12px", mt: 0.5 }}>{helperText}</Typography>}
    </Box>
  );
}
