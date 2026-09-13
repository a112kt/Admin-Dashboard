"use client";
import { useContext } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import PageContainer from "@/components/ui/container/PageContainer";
import BlankCard from "@/components/shared/BlankCard";
import { useUser } from "@/features/brand/user/hooks/userInfoHooks";
import { AdminAuthContext } from "@/context/adminAuthContext";
import { useTranslation } from "react-i18next";

const DEFAULT_PLACEHOLDER = "https://static.vecteezy.com";
const ADMIN_PROFILE_IMG = "/images/profile/admin-profile.png";

const getProfileImage = (url?: string | null) => {
  if (!url || url.trim() === "" || url.startsWith(DEFAULT_PLACEHOLDER)) return ADMIN_PROFILE_IMG;
  return url;
};

const Profile = () => {
  const { t } = useTranslation();
  const { user, loading } = useUser();
  const { adminEmail } = useContext(AdminAuthContext);

  if (loading) {
    return (
      <PageContainer title={t("Admin Profile")} description={t("Admin Profile")}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Admin"
    : "Admin";
  const email = user?.email || adminEmail || "admin@alluvo.com";
  const phone = user?.phoneNumber || "—";
  const gender = user?.gender || "—";
  const dob = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString()
    : "—";
  const profileImage = getProfileImage(user?.profileImageUrl);

  const infoItems = [
    { icon: "solar:mailbox-line-duotone", label: t("Email"), value: email },
    { icon: "solar:phone-line-duotone", label: t("Phone"), value: phone },
    { icon: "solar:user-line-duotone", label: t("Gender"), value: gender },
    { icon: "solar:calendar-line-duotone", label: t("Date of Birth"), value: dob },
  ];

  return (
    <PageContainer title={t("Admin Profile")} description={t("Admin Profile")}>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <BlankCard>
              <Box p={3} display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={profileImage}
                  alt={fullName}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" fontWeight={600}>
                  {fullName}
                </Typography>
                <Chip
                  label={t("Admin")}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </Box>
            </BlankCard>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <BlankCard>
              <Box p={3}>
                <Typography variant="h5" fontWeight={600} mb={3}>
                  {t("Personal Information")}
                </Typography>
                <Stack spacing={2.5}>
                  {infoItems.map((item) => (
                    <Stack
                      key={item.label}
                      direction="row"
                      alignItems="center"
                      gap={2}
                    >
                      <Icon
                        icon={item.icon}
                        width={22}
                        height={22}
                        color="currentColor"
                        style={{ opacity: 0.6 }}
                      />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {item.label}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </BlankCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Profile;
