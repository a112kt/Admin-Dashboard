"use client";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import TableBasicReact from "@/components/ui/tables/TableBasicReact";
import { createColumnHelper } from "@tanstack/react-table";
import { TopEngagedUserDto } from "../types";
import BlankCard from "@/components/shared/BlankCard";

const columnHelper = createColumnHelper<TopEngagedUserDto>();

const columns: any[] = [
  columnHelper.accessor("displayName", {
    header: () => "User",
    cell: (info) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar src={info.row.original.imageUrl} alt={info.getValue()} sx={{ width: 36, height: 36 }} />
        <Typography variant="subtitle2" fontWeight={600}>{info.getValue()}</Typography>
      </Stack>
    ),
  }),
  columnHelper.accessor("engagementScore", {
    header: () => "Score",
    cell: (info) => <Typography fontWeight={600}>{info.getValue().toFixed(1)}</Typography>,
  }),
  columnHelper.accessor("ordersCount", {
    header: () => "Orders",
    cell: (info) => <Typography>{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("reelViewsCount", {
    header: () => "Views",
    cell: (info) => <Typography>{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("reelLikesCount", {
    header: () => "Likes",
    cell: (info) => <Typography>{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("commentsCount", {
    header: () => "Comments",
    cell: (info) => <Typography>{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("wishlistItemsCount", {
    header: () => "Wishlist",
    cell: (info) => <Typography>{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("isFollowing", {
    header: () => "Follows",
    cell: (info) => (
      <Chip
        label={info.getValue() ? "Yes" : "No"}
        color={info.getValue() ? "primary" : "default"}
        size="small"
      />
    ),
  }),
];

interface Props {
  users: TopEngagedUserDto[];
  isLoading?: boolean;
}

const TopEngagedUsersTable = ({ users, isLoading }: Props) => {
  return (
    <Box>
      <BlankCard sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>Top Engaged Users</Typography>
        {users.length > 0 ? (
          <TableBasicReact data={users} columns={columns} />
        ) : (
          !isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Typography color="textSecondary">No engagement data yet</Typography>
            </Box>
          )
        )}
      </BlankCard>
    </Box>
  );
};

export default TopEngagedUsersTable;
