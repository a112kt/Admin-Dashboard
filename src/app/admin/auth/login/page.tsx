"use client";
import { useState, useEffect, useContext } from "react";
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import Image from "next/image";
import NewLogo from "@/components/layout/shared/logo/NewLogo";
import Footer from "@/components/layout/shared/footer/Footer";
import PageContainer from "@/components/ui/container/PageContainer";
import { AdminAuthContext } from "@/context/adminAuthContext";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
    const { t } = useTranslation();
    const { login, adminToken } = useContext(AdminAuthContext);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (adminToken) {
            router.replace("/admin/home");
        }
    }, [adminToken, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: any) {
            const message =
                err?.response?.data?.message?.en ||
                err?.response?.data?.message ||
                err?.message ||
                t("Login failed");
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title={t("Admin Login")} description="Admin Login Page">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.default",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: { xs: 1, sm: 2 },
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: { xs: "100%", sm: 540, md: 920, lg: 1040 },
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            bgcolor: "background.paper",
                            overflow: "hidden",
                            height: "100%",
                            maxHeight: "100vh",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", md: "50%" },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                p: { xs: 2, sm: 3, lg: 4 },
                                gap: 2,
                                boxShadow: "0px 3px 6px 0px #0000000A",
                            }}
                        >
                            <Box>
                                <NewLogo />
                            </Box>
                            <Box sx={{ overflowY: "auto", maxHeight: "100%", p: "8px" }}>
                                <Card variant="outlined" sx={{ border: "none", boxShadow: "none" }}>
                                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                        <Typography variant="h5" fontWeight={700} mb={1}>
                                            {t("Welcome to Alluvo Dashboard")}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mb={3}>
                                            {t("Sign in to continue")}
                                        </Typography>

                                        <form onSubmit={handleSubmit}>
                                            <Stack spacing={3}>
                                                <TextField
                                                    label={t("Email")}
                                                    type="email"
                                                    fullWidth
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    size="small"
                                                />
                                                <TextField
                                                    label={t("Password")}
                                                    type="password"
                                                    fullWidth
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    size="small"
                                                />
                                                {error && (
                                                    <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                                                        {error}
                                                    </Alert>
                                                )}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    fullWidth
                                                    disabled={loading}
                                                    sx={{ py: 2 }}
                                                >
                                                    {loading ? (
                                                        <CircularProgress size={22} color="inherit" />
                                                    ) : (
                                                        t("Sign In")
                                                    )}
                                                </Button>
                                            </Stack>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: { xs: "100%", md: "50%" },
                                position: "relative",
                                display: { xs: "none", md: "block" },
                            }}
                        >
                            <Image
                                src="/images/backgrounds/largeLogo.png"
                                alt="Login Visual"
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    component="footer"
                    sx={{
                        flexShrink: 0,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        pb: { xs: 2 },
                        px: { xs: 2 },
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 1236 }}>
                        <Footer />
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
}
