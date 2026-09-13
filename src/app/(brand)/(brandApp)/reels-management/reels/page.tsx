"use client";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Typography, Box, Stack, Button, TextField, Chip, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllReels } from "@/features/brand/reelsManagement/hooks/reelsHooks";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import ReelCard from "@/features/brand/reelsManagement/components/reelCard";
import type { ReelsType } from "@/features/brand/reelsManagement/types";
import { Pagination } from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";

const BCrumb = [
  {
    to: "/",
    title: "Dashboard",
  },
  {
    title: "Reels",
  },
];

const Reels = () => {
  //  const { reels, sortBy, setSortBy } = useContext(BlogContext);
  const [sortBy, setSortBy] = useState("latest")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("all")
  const [counts, setCounts] = useState({
    all: 0,
    published: 0,
    draft: 0
  })

  const { data: reels, isLoading, isSuccess, isError } = useGetAllReels({ Search: search, Status: filter, Sort: sortBy, Page: page });



  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  useEffect(() => {
    setPage(1)
  }, [search, filter, sortBy])

  useEffect(() => {
    if (isSuccess && reels?.data) {
      setCounts(reels.data.counts)
    }
  }, [reels])





  return (
    <PageContainer title="Community" description="this is Community">
      <Breadcrumb
        title="Blog"
        items={BCrumb}
        bg="linear-gradient(135deg, #1B2351 0%, #11183D 100%)"
      >
        <Button
          component={Link}
          color="secondary"
          href="/reels-management/add-reels"
          variant="contained"
          sx={{
            color: 'white',
            backdropFilter: 'blur(10px)',
          }}
          startIcon={<IconPlus size={18} />}
        >
          New Reel
        </Button>
      </Breadcrumb>
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <TextField
            value={search}
            onChange={(e) => {
              if (e.target.value.trim().length > 0) {
                setSearch(e.target.value)
              }
              else {
                setSearch("")
              }
            }}
            size="small"
            placeholder="Search..."
            sx={{ width: { xs: '100%', md: '300px' } }}
            InputProps={{
              startAdornment: <IconSearch size="18" style={{ marginRight: '8px', opacity: 0.5 }} />,
            }}
          />

          <Stack direction="row" spacing={4} alignItems="center">
            {[
              { label: 'All reels', value: 'all', count: counts.all  },
              { label: 'Published', value: 'published', count: counts.published  },
              { label: 'Draft', value: 'draft', count: counts.draft  },
            ].map((item) => (
              <Stack
                key={item.value}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  opacity: filter === item.value ? 1 : 0.6,
                  transition: 'all 0.2s',
                  '&:hover': {
                    opacity: 1,
                    transform: 'translateY(-1px)'
                  },
                  borderBottom: filter === item.value ? '2px solid' : '2px solid transparent',
                  borderColor: '#1B2351',
                  pb: 0.5
                }}
                onClick={() => handleFilterChange(item.value)}
              >
                <Typography variant="subtitle2" fontWeight={700}>{item.label}</Typography>
                <Chip
                  label={item.count}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '10px',
                    fontWeight: 700,
                    bgcolor: filter === item.value ? '#1B2351' : 'default',
                    color: filter === item.value ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: filter === item.value ? '#1B2351' : 'default',
                    }
                  }}
                />
              </Stack>
            ))}

            <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', height: 24, mx: 1 }} />

            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ '& .MuiInputBase-root': { border: 'none' } }}
            >
              <option value="newest">Sort by: Latest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="popular">Sort by: Popular</option>
            </TextField>
          </Stack>
        </Stack>
      </Box>
      {
        isError ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
            <Typography variant="h6" sx={{ color: "gray" }}>Something went wrong</Typography>
          </Box>
        ) : <></>
      }

      {!isError ? < Grid container spacing={3} columns={{ lg: 12, md: 8, sm: 6, xs: 4 }} sx={{ minHeight: '50vh' }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <CircularProgress size={50} />
          </Box>
        ) : reels?.data?.pagination?.totalItems === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Typography variant="h6" sx={{ color: "gray" }}>No Reels Found</Typography>
          </Box>
        ) : (
          reels?.data?.data?.map((reel: ReelsType) => {
            return <ReelCard reel={reel} key={reel.id} />;
          })
        )}
        {/* <Grid
          mt={3}
          size={{
            lg: 12,
            sm: 12
          }}>

        </Grid> */}
      </Grid> : <></>}

      {reels?.data?.pagination?.totalPages > 1 ? <Pagination page={page} count={reels?.data?.pagination?.totalPages} color="primary" sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} onChange={(e, value) => setPage(value)} /> : <></>}

    </PageContainer >
  );
};

export default Reels;
