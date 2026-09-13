"use client";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    LinearProgress,
    Stack
} from "@mui/material";
import {
    IconHourglass,
    IconCalendarCheck,
    IconInfoCircle
} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

interface PendingApprovalViewProps {
    submittedAt?: string;
}

export default function PendingApprovalView({ submittedAt }: PendingApprovalViewProps) {
    const { t } = useTranslation();

    const formattedDate = submittedAt
        ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(submittedAt))
        : null;

    return (
        <Box maxWidth={800} mx="auto" mt={6} px={2}>
            <Card elevation={4} sx={{ borderRadius: 4, overflow: 'visible' }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <Chip
                            label={t("Pending Approval")}
                            color="warning"
                            icon={<IconHourglass size={18} />}
                            sx={{ fontWeight: 600, fontSize: '0.9rem', px: 2, py: 2.5 }}
                        />

                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                {t("Your brand registration is under review")}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth={600}>
                                {t("Your brand registration has been submitted successfully. Your request is currently under review. You can continue using community features while waiting for approval.")}
                            </Typography>
                        </Box>

                        <Box width="100%" maxWidth={400}>
                            <LinearProgress color="warning" sx={{ height: 8, borderRadius: 4 }} />
                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                <Typography variant="caption" color="text.secondary">{t("Submitted")}</Typography>
                                <Typography variant="caption" color="text.secondary">{t("Under Review")}</Typography>
                                <Typography variant="caption" color="text.disabled">{t("Approved")}</Typography>
                            </Stack>
                        </Box>

                        <Stack spacing={1.5} alignItems="center">
                            {formattedDate && (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <IconCalendarCheck size={20} color="#f59e0b" />
                                    <Typography variant="body2" color="text.secondary">
                                        {t("Submitted on")}: {formattedDate}
                                    </Typography>
                                </Stack>
                            )}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconInfoCircle size={20} color="#3b82f6" />
                                <Typography variant="body2" color="text.secondary">
                                    {t("We will notify you once the review is complete")}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
