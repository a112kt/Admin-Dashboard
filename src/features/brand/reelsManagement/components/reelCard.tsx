// third-party
import { format } from "date-fns";
import NextLink from "next/link";

import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Box,
} from "@mui/material";
import { IconEye, IconMessage2, IconPointFilled, IconHeartFilled, } from "@tabler/icons-react";
import BlankCard from "@/components/shared/BlankCard";
import type { ReelsType } from "../types";



const ReelCard = ({ reel }: { reel: ReelsType }) => {
  // const { thumbnail, title, view, comments, category, user, createdAt } = reel;

  const linkTo = reel.id;

  return (
    <Grid
      display="flex"
      alignItems="stretch"
      size={{
        xs: 12,
        lg: 3,
        md: 4,
        sm: 6,
      }}
    >
      <BlankCard className="hoverCard">
        <>
          <Typography component={NextLink} href={`/reels-management/reels/${linkTo}`}>
            <CardMedia
              component="img"
              height="480"
              image={reel.thumbnail}
              alt={reel.title}
              sx={{ borderRadius: '8px 8px 0 0' }}
            />
          </Typography>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              {/* <Avatar src={author?.avatar} sx={{ width: 32, height: 32 }} /> */}
              <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
                {reel?.ownerName}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {MapChip(reel.status)}
            </Stack>

            <Typography
              variant="h5"
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                lineHeight: 1.4,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: 'blackColor.black60'
              }}
              component={NextLink}
              href={`/reels-management/reels/${linkTo}`}
            >
              {reel.title}
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between" color="textSecondary">
              <Stack direction="row" spacing={1} alignItems="center" >
                <IconHeartFilled size="16" color="red" />
                <Typography variant="caption">{reel.likesCount}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0}>
                <IconPointFilled size="16" />
                <Typography variant="caption" >
                  {format(new Date(reel.createdAt ?? new Date()), "MMM d, yyyy")}
                </Typography>
              </Stack>

            </Stack>
          </CardContent>
        </>
      </BlankCard>
    </Grid>
  );
};

export default ReelCard;

function MapChip(status: string) {
  if (status === 'published') {
    return (
      <Chip
        label="Published"
        size="small"
        color="primary"
        // variant="primary"
        sx={{ height: 20, fontSize: '0.75rem', bgcolor: "#8754EC26", color: "#8754EC" }}
      />
    )
  }
  else {
    return (
      <Chip
        label="Draft"
        size="small"
        // variant="primary"
        sx={{ height: 20, fontSize: '0.75rem', bgcolor: "#80808033", color: "#808080" }}
      />
    )
  }
}
