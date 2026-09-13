"use client";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    Button,
    Stack,
    Alert
} from "@mui/material";
import { IconX, IconAlertTriangle, IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

interface RejectedViewProps {
    rejectionReason?: string | null;
    rejectionCode?: string | null;
    onContinueRegistration?: () => void;
    lastFailedStep?: number | null;
}

export default function RejectedView({
    rejectionReason,
    rejectionCode,
    onContinueRegistration,
    lastFailedStep
}: RejectedViewProps) {
    const { t } = useTranslation();

    return (
        <Box maxWidth={800} mx="auto" mt={6} px={2}>
            <Card elevation={4} sx={{ borderRadius: 4, overflow: 'visible' }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <Chip
                            label={t("Registration Rejected")}
                            color="error"
                            icon={<IconX size={18} />}
                            sx={{ fontWeight: 600, fontSize: '0.9rem', px: 2, py: 2.5 }}
                        />

                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                {t("Your brand registration was not approved")}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth={600}>
                                {t("Unfortunately, your brand registration could not be approved at this time. Please review the reason below and resubmit.")}
                            </Typography>
                        </Box>

                        {rejectionReason && (
                            <Alert
                                severity="error"
                                icon={<IconAlertTriangle size={22} />}
                                sx={{ width: '100%', maxWidth: 500, textAlign: 'left', borderRadius: 2 }}
                            >
                                <Typography fontWeight={600}>{t("Reason")}:</Typography>
                                <Typography variant="body2">{rejectionReason}</Typography>
                                {rejectionCode && (
                                    <Typography variant="caption" color="text.secondary">
                                        {t("Code")}: {rejectionCode}
                                    </Typography>
                                )}
                            </Alert>
                        )}

                        <Stack spacing={2} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                {lastFailedStep
                                    ? t("You can continue from where you left off.")
                                    : t("Please start the registration process again.")}
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<IconRefresh size={20} />}
                                endIcon={<IconArrowRight size={20} />}
                                onClick={onContinueRegistration}
                                sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 600 }}
                            >
                                {t("Continue Registration")}
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
