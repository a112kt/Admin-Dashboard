"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { Typography, Box, CircularProgress, Avatar, Rating, Stack, Button, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useGetReelById } from "@/features/brand/reelsManagement/hooks/reelsHooks";
import { deleteReel } from "@/features/brand/reelsManagement/services";
import BlankCard from "@/components/shared/BlankCard";
import ReelComponent from "@/features/brand/reelsManagement/components/reelComponent";
import TableBasicReact from "@/components/ui/tables/TableBasicReact";
import { ProductsTableType } from "@/features/brand/reelsManagement/types";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ConfirmDeleteDialog from "@/components/ui/dialog/ConfirmDeleteDialog";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper<ProductsTableType>();

const columns: any[] = [
  columnHelper.accessor("imagesUrl", {
    header: () => "Product",
    cell: (info) => (
      <Stack direction="row" spacing={1}>
        {info.getValue()?.slice(0, 3).map((url, index) => (
          <Avatar key={index} src={url} sx={{ width: 40, height: 40 }} />
        ))}
      </Stack>
    ),

  }),

  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => (
      <Typography variant="h6">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => (
      <Typography variant="h6">EGP {info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("rating", {
    header: () => "Rating",
    cell: (info) => (
      <Rating value={info.getValue()} readOnly />
    ),
  }),

];

const ReelDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const reelId = params.reelId;
  const { data: reel, isLoading, isSuccess, isError } = useGetReelById(reelId as string);
  const [reelName, setReelName] = useState("reel name");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteReel = async () => {
    await deleteReel(Number(reelId));
    setDeleteDialogOpen(false);
    router.push("/reels-management/reels");
  };

  useEffect(() => {
    if (isSuccess) {
      setReelName(reel?.data?.title || "reel name");
    }
  }, [reel, isSuccess])

  const BCrumb = [
    {
      title: t('Reels Management'),
      to: "/reels-management/reels",
    },
    {
      title: t('Reels'),
      to: "/reels-management/reels",
    },
    {
      title: reelName,
    },
  ];

  return (
    <PageContainer title={`${t('Reel Details')} ${reelId}`}>
      <Breadcrumb title={t('Reel Details')} items={BCrumb} />
      <Box>
        {
          isLoading ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
              <CircularProgress size={50} />
            </Box>
            :
            isError ?
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
                <Typography variant="h6" sx={{ color: "gray" }}>Something went wrong</Typography>
              </Box>
              :
              <>
                <BlankCard sx={{ width: "100%", height: "80vh", padding: 4, marginBottom: "15px", paddingBottom: "60px" }}>
                  <Stack direction="row" mb={"15px"} spacing={2} alignItems="center" justifyContent={"space-between"}>
                    <Typography variant="h6">{reel?.data?.title}</Typography>
                    <Stack flexDirection={"row"} gap={1}>
                      <Button
                        component={Link}
                        color="secondary"
                        href={`/reels-management/edit-reels/${reelId}`}
                        variant="contained"
                        sx={{
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                        }}
                        startIcon={< IconEdit size={18} />}
                      >
                        Edit Reel
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                        }}
                        startIcon={< IconTrash size={18} />}
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        Delete Reel
                      </Button>
                    </Stack>


                  </Stack>
                  {reelId && <ReelComponent reel={reel.data} reelId={reelId as string} />}
                </BlankCard>
                <BlankCard sx={{ width: "100%", height: "100%", padding: 4 }}>
                  {reel?.data?.products && reel.data.products.length > 0 ?

                    <>
                      <Typography variant="h6">Products In Reel</Typography>
                      <TableBasicReact data={reel?.data?.products ?? []} columns={columns} />
                    </>
                    :
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                      <Typography variant="h6" sx={{ color: "gray" }}>No products Added In the Reel</Typography>
                    </Box>
                  }
                </BlankCard>
              <ConfirmDeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteReel}
                title="Delete Reel"
                itemName={reel?.data?.title}
              />
              </>
        }
      </Box>
    </PageContainer>
  );
};

export default ReelDetails;
