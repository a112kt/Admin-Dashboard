"use client";
import { Avatar, Box, Stack, Typography, Link as MuiLink } from "@mui/material";
import { Icon } from "@iconify/react";
import BlankCard from "@/components/shared/BlankCard";
import { BrandOwnerDetails } from "../types";

interface Props {
  owner: BrandOwnerDetails;
}

const BrandOwnerCard = ({ owner }: Props) => {
  return (
    <BlankCard>
      <Box p={3}>
        <Typography variant="h5" fontWeight={600} mb={2}>Brand Owner</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={owner.imageUrl} alt={owner.displayName} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="h6" fontWeight={600}>{owner.displayName}</Typography>
            {owner.email && (
              <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
                <Icon icon="solar:letter-line-duotone" width={16} />
                <MuiLink href={`mailto:${owner.email}`} variant="body2" color="textSecondary" underline="hover">
                  {owner.email}
                </MuiLink>
              </Stack>
            )}
            {owner.phoneNumber && (
              <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
                <Icon icon="solar:phone-line-duotone" width={16} />
                <Typography variant="body2" color="textSecondary">{owner.phoneNumber}</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default BrandOwnerCard;
