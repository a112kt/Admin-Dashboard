"use client";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "@/context/authContext";
import { useGetInterests, useAddInterests } from "../hooks/getAndSetInterestsOptions";
import { useTranslation } from "react-i18next";
import InterestCardSelectable from "./InterestCardSelectable";

export default function StepBrandInterests() {
  const { t } = useTranslation();
  const { setStep } = useContext(AuthContext);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { data, isLoading } = useGetInterests();
  const { mutate: addInterests, isPending } = useAddInterests(() => {
    setStep(4);
  });

  const handleToggle = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id.toString())
        ? prev.filter((item) => item !== id.toString())
        : [...prev, id.toString()]
    );
  };

  const handleSubmit = () => {
    addInterests(selectedInterests);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 0.5,
            fontSize: { xs: "20px", sm: "24px" },
          }}
        >
          {t("What defines your brand?")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "14px" }}>
          {t("Select the interests that best align with your brand")}
        </Typography>
      </Box>

      {selectedInterests.length > 0 && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            bgcolor: "rgba(71, 192, 210, 0.1)",
            mb: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "secondary.main", fontSize: "12px" }}
          >
            {selectedInterests.length} selected
          </Typography>
        </Box>
      )}

      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {data?.data?.map((interest: any) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={interest.id}>
            <InterestCardSelectable
              id={interest.id}
              name={interest.name}
              isSelected={selectedInterests.includes(interest.id.toString())}
              onToggle={() => handleToggle(interest.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={isPending || selectedInterests.length === 0}
            sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
          >
            {isPending ? (
              <CircularProgress size={24} sx={{ color: "black", p: "5px" }} />
            ) : (
              t("CONTINUE")
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
