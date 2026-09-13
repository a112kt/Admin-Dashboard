"use client";
import { Avatar, Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import BlankCard from "@/components/shared/BlankCard";
import { BrandDetailsResponse } from "../types";

interface Props {
  brand: BrandDetailsResponse;
}

const BrandInfoCard = ({ brand }: Props) => {
  return (
    <BlankCard>
      <Box sx={{ position: "relative" }}>
        {brand.coverImageUrl ? (
          <Box
            component="img"
            src={brand.coverImageUrl}
            alt="cover"
            sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "24px 24px 0 0" }}
          />
        ) : (
          <Box sx={{ width: "100%", height: 120, bgcolor: "primary.light", borderRadius: "24px 24px 0 0" }} />
        )}
        <Avatar
          src={brand.logoUrl}
          alt={brand.displayName}
          sx={{
            width: 100,
            height: 100,
            border: "4px solid white",
            position: "absolute",
            bottom: -50,
            left: 24,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          }}
        />
      </Box>
      <Box sx={{ pt: 7, pb: 3, px: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontWeight={700}>{brand.displayName}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {brand.category} &bull; {brand.country}, {brand.governorate}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {brand.isVerified && (
              <Chip icon={<Icon icon="solar:verified-check-line-duotone" width={18} />} label="Verified" color="primary" size="small" />
            )}
            <Chip label={brand.status.replace("_", " ")} color={brand.status === "APPROVED" ? "success" : "warning"} size="small" />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.7, flex: 1 }}>
            {brand.description}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Icon icon="solar:eye-line-duotone" width={18} />}
            onClick={() => window.open(`https://alluvo.life/brandProfile/${brand.id}`, '_blank', 'noopener,noreferrer')}
            sx={{ ml: 2, flexShrink: 0 }}
          >
            View on Site
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Box>
            <Typography variant="caption" color="textSecondary">Created</Typography>
            <Typography variant="body2" fontWeight={600}>{new Date(brand.createdAt).toLocaleDateString()}</Typography>
          </Box>
          {brand.submittedAt && (
            <Box>
              <Typography variant="caption" color="textSecondary">Submitted</Typography>
              <Typography variant="body2" fontWeight={600}>{new Date(brand.submittedAt).toLocaleDateString()}</Typography>
            </Box>
          )}
          <Box>
            <Typography variant="caption" color="textSecondary">Employees</Typography>
            <Typography variant="body2" fontWeight={600}>{brand.numberOfEmployees}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">Rating</Typography>
            <Typography variant="body2" fontWeight={600}>{brand.averageRating.toFixed(1)} ({brand.numOfReviews})</Typography>
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default BrandInfoCard;
