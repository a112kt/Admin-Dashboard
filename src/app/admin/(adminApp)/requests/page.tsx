"use client";
import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    Avatar,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
    IconEye,
    IconCheck,
    IconX,
    IconBan,
    IconSearch,
    IconRefresh,
} from "@tabler/icons-react";
import PageContainer from "@/components/ui/container/PageContainer";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import { useTranslation } from 'react-i18next';
import { useBrandRequests } from "@/features/admin/requests/hooks/useBrandRequests";
import { useQuery } from "@tanstack/react-query";
import {
    getRejectionReasons,
    approveBrandRequest,
    rejectBrandRequest,
    banBrandUser,
    getBrandRequestDetails,
} from "@/features/admin/requests/services";
import { BrandRequestDetails } from "@/features/admin/requests/types";




export default function RequestsPage() {
    const { t } = useTranslation();
    const {
        requests,
        totalCount,
        page,
        setPage,
        pageSize,
        setPageSize,
        status,
        setStatus,
        search,
        setSearch,
        loading,
        refetch,
    } = useBrandRequests();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [details, setDetails] = useState<BrandRequestDetails | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [rejectOpen, setRejectOpen] = useState(false);
    const [rejectReasonId, setRejectReasonId] = useState<number>(0);
    const [rejectTargetId, setRejectTargetId] = useState<number | null>(null);

    const [banOpen, setBanOpen] = useState(false);
    const [banTargetId, setBanTargetId] = useState<number | null>(null);
    const baseurl = process.env.NEXT_PUBLIC_APP_URL;

    const { data: reasons } = useQuery({
        queryKey: ["rejectionReasons"],
        queryFn: async () => {
            const res = await getRejectionReasons();
            return res.data;
        },
    });

    const handleViewDetails = async (id: number) => {
        setSelectedId(id);
        setDetailsOpen(true);
        setDetailsLoading(true);
        try {
            const res = await getBrandRequestDetails(id);
            setDetails(res.data);
        } catch (e) {
            console.error("Failed to load details", e);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        await approveBrandRequest(id);
        refetch();
    };

    const handleRejectClick = (id: number) => {
        setRejectTargetId(id);
        setRejectReasonId(0);
        setRejectOpen(true);
    };

    const handleRejectConfirm = async () => {
        if (rejectTargetId && rejectReasonId) {
            await rejectBrandRequest(rejectTargetId, rejectReasonId);
            setRejectOpen(false);
            refetch();
        }
    };

    const handleBanClick = (id: number) => {
        setBanTargetId(id);
        setBanOpen(true);
    };

    const handleBanConfirm = async () => {
        if (banTargetId) {
            await banBrandUser(banTargetId);
            setBanOpen(false);
            refetch();
        }
    };

    const statusChip = (status: string) => {
        const props: Record<string, any> = {
            PENDING_APPROVAL: { color: "warning", label: t("Pending") },
            APPROVED: { color: "success", label: t("Approved") },
            REJECTED: { color: "error", label: t("Rejected") },
            BANNED: { color: "error", label: t("Banned") },
            IN_PROGRESS: { color: "info", label: t("In Progress") },
        };
        const chip = props[status] || { color: "default", label: status };
        return <Chip size="small" color={chip.color} label={chip.label} />;
    };

    const columns: GridColDef[] = [
        {
            field: "logoUrl",
            headerName: "",
            width: 60,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Avatar
                    src={params.value}
                    alt={params.row.brandName}
                    sx={{ width: 36, height: 36, borderRadius: 1 }}
                />
            ),
        },
        { field: "brandName", headerName: t("Brand Name"), flex: 1, minWidth: 140 },
        { field: "ownerName", headerName: t("Owner"), flex: 1, minWidth: 120 },
        { field: "ownerPhone", headerName: t("Phone"), width: 130 },
        { field: "country", headerName: t("Country"), width: 110 },
        { field: "category", headerName: t("Category"), width: 120 },
        {
            field: "submittedAt",
            headerName: t("Submitted"),
            width: 110,
            valueFormatter: (value: string) =>
                value ? new Date(value).toLocaleDateString() : "",
        },
        {
            field: "status",
            headerName: t("Status"),
            width: 130,
            renderCell: (params: GridRenderCellParams) => statusChip(params.value),
        },
        {
            field: "actions",
            headerName: t("Actions"),
            width: 180,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <Tooltip title={t("View Details")}>
                        <IconButton size="small" onClick={() => handleViewDetails(params.row.id)}>
                            <IconEye size={18} />
                        </IconButton>
                    </Tooltip>
                    {params.row.status === "PENDING_APPROVAL" && (
                        <>
                            <Tooltip title={t("Approve")}>
                                <IconButton size="small" color="success" onClick={() => handleApprove(params.row.id)}>
                                    <IconCheck size={18} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Reject")}>
                                <IconButton size="small" color="error" onClick={() => handleRejectClick(params.row.id)}>
                                    <IconX size={18} />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    {params.row.status !== "BANNED" && (
                        <Tooltip title={t("Ban")}>
                            <IconButton size="small" color="error" onClick={() => handleBanClick(params.row.id)}>
                                <IconBan size={18} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            ),
        },
    ];

    const breadcrumbitems = [
        { title: "Admin", to: "/admin" },
        { title: t("Brand Requests"), to: "/admin/requests" },
    ];

    return (
        <PageContainer title={t("Brand Requests")} description={t("Manage brand registration requests")}>
            <Breadcrumb title={t("Brand Requests")} items={breadcrumbitems} />

            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="center">
                        <TextField
                            size="small"
                            placeholder={t("Search...")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconSearch size={20} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{ minWidth: 250 }}
                        />
                        <Select
                            size="small"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            displayEmpty
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="">{t("All Statuses")}</MenuItem>
                            <MenuItem value="PENDING_APPROVAL">{t("Pending")}</MenuItem>
                            <MenuItem value="APPROVED">{t("Approved")}</MenuItem>
                            <MenuItem value="REJECTED">{t("Rejected")}</MenuItem>
                            <MenuItem value="BANNED">{t("Banned")}</MenuItem>
                        </Select>
                        <Button
                            variant="outlined"
                            startIcon={<IconRefresh size={18} />}
                            onClick={() => refetch()}
                        >
                            {t("Refresh")}
                        </Button>
                    </Box>

                    <DataGrid
                        rows={requests}
                        columns={columns}
                        loading={loading}
                        rowCount={totalCount}
                        paginationMode="server"
                        pageSizeOptions={[10, 20, 50]}
                        paginationModel={{ page: page - 1, pageSize }}
                        onPaginationModelChange={(model) => {
                            setPage(model.page + 1);
                            setPageSize(model.pageSize);
                        }}
                        disableRowSelectionOnClick
                        autoHeight
                        sx={{
                            border: "none",
                            "& .MuiDataGrid-cell:focus": { outline: "none" },
                        }}
                        localeText={{
                            noRowsLabel: t("No requests found"),
                        }}
                    />
                </CardContent>
            </Card>

            {/* Details Dialog */}
            <Dialog
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                maxWidth="md"
                fullWidth
                scroll="body"
            >
                <DialogTitle>{t("Brand Request Details")}</DialogTitle>
                <DialogContent dividers>
                    {detailsLoading ? (
                        <Typography>{t("Loading...")}</Typography>
                    ) : details ? (
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Typography variant="h6" fontWeight={600}>{t("User Information")}</Typography>
                                <Box display="flex" gap={2} alignItems="center" mt={1}>
                                    <Avatar src={details.user.profileImage} sx={{ width: 60, height: 60 }} />
                                    <Box>
                                        <Typography fontWeight={500}>{details.user.firstName} {details.user.lastName}</Typography>
                                        <Typography variant="body2" color="text.secondary">{details.user.email}</Typography>
                                        <Typography variant="body2" color="text.secondary">{details.user.phone}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" mt={1}>
                                    {t("Gender")}: {details.user.gender} | {t("DOB")}: {details.user.dateOfBirth ? new Date(details.user.dateOfBirth).toLocaleDateString() : "N/A"}
                                </Typography>
                                {details.user.interests.length > 0 && (
                                    <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
                                        {details.user.interests.map((interest, i) => (
                                            <Chip key={i} label={interest} size="small" variant="outlined" />
                                        ))}
                                    </Box>
                                )}
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="h6" fontWeight={600} mt={2}>{t("Brand Information")}</Typography>
                                <Box display="flex" gap={2} alignItems="center" mt={1}>
                                    <Avatar src={details.brand.logoUrl} sx={{ width: 60, height: 60, borderRadius: 1 }} />
                                    <Box>
                                        <Typography fontWeight={500}>{details.brand.displayName}</Typography>
                                        <Typography variant="body2" color="text.secondary">{details.brand.category} - {details.brand.country}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" mt={1}>{details.brand.description}</Typography>
                                <Typography variant="body2" mt={1}>
                                    {t("Employees")}: {details.brand.numberOfEmployees} | {t("Governorate")}: {details.brand.governorate} | {t("District")}: {details.brand.district}
                                </Typography>
                            </Grid>

                            {details.verification && (
                                <Grid size={12}>
                                    <Typography variant="h6" fontWeight={600} mt={2}>{t("Verification")}</Typography>
                                    <Typography variant="body2" mt={1}>
                                        {t("Full Name")}:{details.verification.fullName}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t("National ID")}:{details.verification.nationalId}
                                    </Typography>
                                    {details.verification.taxNumber && (
                                        <Typography variant="body2">
                                            {t("Tax Number")}:{details.verification.taxNumber}
                                        </Typography>
                                    )}
                                    <Typography variant="body2">
                                        {t("Phone")}: {details.verification.phoneNumber}
                                    </Typography>
                                    <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                                        <Box>
                                            <Typography variant="caption">{t("Front ID")}</Typography>
                                            <Avatar
                                                src={baseurl + '/' + details.verification.idFrontImage}
                                                variant="rounded"
                                                sx={{ width: 120, height: 80, cursor: "pointer" }}
                                                onClick={() => window.open(baseurl + '/' + details.verification!.idFrontImage, "_blank")}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption">{t("Back ID")}</Typography>
                                            <Avatar
                                                src={baseurl + '/' + details.verification.idBackImage}
                                                variant="rounded"
                                                sx={{ width: 120, height: 80, cursor: "pointer" }}
                                                onClick={() => window.open(baseurl + '/' + details.verification!.idBackImage, "_blank")}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption">{t("Selfie")}</Typography>
                                            <Avatar
                                                src={baseurl + '/' + details.verification.selfieImage}
                                                variant="rounded"
                                                sx={{ width: 120, height: 80, cursor: "pointer" }}
                                                onClick={() => window.open(baseurl + '/' + details.verification!.selfieImage, "_blank")}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            )}

                            {details.rejectionReason && (
                                <Grid size={12}>
                                    <Typography variant="h6" fontWeight={600} mt={2} color="error">{t("Rejection Reason")}</Typography>
                                    <Chip
                                        label={`${details.rejectionReason.code}: ${details.rejectionReason.description}`}
                                        color="error"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                            )}

                            <Grid size={12}>
                                <Box display="flex" gap={1} mt={2}>
                                    {details.status === "PENDING_APPROVAL" && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                startIcon={<IconCheck size={18} />}
                                                onClick={async () => {
                                                    await approveBrandRequest(details.id);
                                                    setDetailsOpen(false);
                                                    refetch();
                                                }}
                                            >
                                                {t("Approve")}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<IconX size={18} />}
                                                onClick={() => {
                                                    setDetailsOpen(false);
                                                    handleRejectClick(details.id);
                                                }}
                                            >
                                                {t("Reject")}
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<IconBan size={18} />}
                                        onClick={() => {
                                            setDetailsOpen(false);
                                            handleBanClick(details.id);
                                        }}
                                    >
                                        {t("Ban")}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography color="error">{t("Failed to load details")}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsOpen(false)}>{t("Close")}</Button>
                </DialogActions>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{t("Reject Brand Request")}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" mb={2}>{t("Select a reason for rejection")}</Typography>
                    <Select
                        fullWidth
                        value={rejectReasonId}
                        onChange={(e) => setRejectReasonId(Number(e.target.value))}
                        displayEmpty
                    >
                        <MenuItem value={0} disabled>{t("Select reason...")}</MenuItem>
                        {(reasons ?? []).map((reason) => (
                            <MenuItem key={reason.id} value={reason.id}>
                                {reason.description}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectOpen(false)}>{t("Cancel")}</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleRejectConfirm}
                        disabled={!rejectReasonId}
                    >
                        {t("Reject")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Ban Dialog */}
            <Dialog open={banOpen} onClose={() => setBanOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{t("Ban Brand User")}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="error">
                        {t("Are you sure you want to ban this user? This action cannot be undone. The user will lose access to all brand features.")}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBanOpen(false)}>{t("Cancel")}</Button>
                    <Button variant="contained" color="error" onClick={handleBanConfirm}>
                        {t("Ban")}
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
}
