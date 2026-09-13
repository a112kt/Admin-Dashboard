"use client"
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { loginType } from "@/features/brand/auth/types/auth";
import CustomCheckbox from "@/components/ui/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import Link from "next/link";
import { useBrandLogin } from "@/features/brand/auth/login/hooks/login.hook";
import ErrorBox from "@/components/ui/boxes/errorBox";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useTranslation } from 'react-i18next';

function getRolesFromToken(token: string): string[] {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles =
      payload.role ??
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!roles) return [];

    return Array.isArray(roles) ? roles : [roles];
  } catch {
    return [];
  }
}

const AuthLogin = ({ title, subtitle, subtext, role }: loginType) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { mutateAsync: brandLogin, isPending, isError, error: errorData, data } = useBrandLogin(handleLoginResponse);
  const { setToken, setRoles } = useContext(AuthContext);

  const handleBrandLogin = async () => {
    brandLogin({ email, password },
      {
        onError: (error: any) => {
          const msg = error?.response?.data?.message?.en;
          setError(msg || t("Something went wrong. Please try again later."));
        }
      }
    )
  };
  function handleLoginResponse(data: any) {
    if (data?.data?.token) {
      setToken(data.data.token);
      const roles = getRolesFromToken(data.data.token);
      setRoles(roles);
      router.replace("/home");
    } else {
      setError(t("Something went wrong. Please try again later."));
    }
  }

  const handleAdminLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email, password);
    // try {
    //   await signin(email, password);
    //   router.push("/");
    // } catch (err: any) {
    //   setError(err.message);
    // }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {role === 'brand' && <>
        <AuthSocialButtons title={t('Sign in with')} />
        <Box mt={3}>
          <Divider>
            <Typography
              component="span"
              color="textSecondary"
              variant="h6"
              fontWeight="400"
              position="relative"
              px={2}
            >
              {t('or sign in with')}
            </Typography>
          </Divider>

          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
        </Box>
      </>
      }
      <form onSubmit={role === 'brand' ? handleBrandLogin : handleAdminLogin}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">{t('Email')}</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmail(e.target.value)
              }
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">{t('Password')}</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            {/* <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label={t('Remeber this Device')}
              />
            </FormGroup>
            <Typography
              component={Link}
              href={role === 'brand' ? "/auth/forgot-password" : "/admin/auth/forgot-password"}
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              {t('Forgot Password ?')}
            </Typography> */}
          </Stack>
        </Stack>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            onClick={() => {
              if (!email || !password) {
                setError(t("Please enter email and password"));
                return;
              }
              handleBrandLogin()
            }}
            disabled={isPending || !email || !password}
          >
            {isPending ? <CircularProgress size={30} sx={{ color: "black", p: "5px" }} /> : t('Sign In')}
          </Button>
        </Box>
        {isError && (
          <ErrorBox errorMessage={error && error !== " " ? error : t("Something went wrong. Please try again later.")} />
        )}
      </form>

      {subtitle}
    </>
  );
};
export default AuthLogin;
