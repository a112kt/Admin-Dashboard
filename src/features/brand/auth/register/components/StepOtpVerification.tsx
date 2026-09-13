"use client";
import { Box, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext, AuthContextType } from "@/context/authContext";
import { useVerify, useResendCode } from "../../verification/hooks/useVerify";
import { TimerIcon2, QuestionMarkIcon, PhoneIcon } from "@/components/ui/icons/icons";
import { useTranslation } from "react-i18next";
import { markStepCompleted, isStepCompleted } from "../utils/registerPersistence";

interface StepOtpVerificationProps {
  onSuccess: () => void;
}

export default function StepOtpVerification({ onSuccess }: StepOtpVerificationProps) {
  const { t } = useTranslation();
  const { email, setToken, setVerificationTimer: setTimeLeft, verificationTimer: timeLeft, verificationErrorState: verificationError, setVerificationErrorState: setVerificationError }: AuthContextType = useContext(AuthContext);

  const isReadOnly = isStepCompleted(2);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [valid, setValid] = useState(false);

  const { mutate: verify, isPending: verifyPending, errorMessage: verifyErrorMessage, error: verifyError } = useVerify((data: any) => {
    markStepCompleted(2);
    setToken(data);
    onSuccess();
  });

  const { mutate: resendOtp, isPending: resendPending, errorMessage: resendErrorMessage } = useResendCode(() => {
    setVerificationError(false);
    inputsRef.current.forEach((input) => { if (input) input.value = ""; });
    setValid(false);
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(Number(timeLeft) - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (verifyError && (verifyError as any)?.response?.status === 400) {
      setVerificationError(true);
    }
  }, [verifyError]);

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  }, []);

  const formattedTime = `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    const allFilled = inputsRef.current.every((input) => input && input.value.trim() !== "");
    setValid(allFilled);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  function handleVerify() {
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    verify({ email: email.toString(), otp: otp.toString() });
  }

  function handleResend() {
    resendOtp(email);
    setTimeLeft(60);
  }

  return (
    <Box>
      {isReadOnly && (
        <Box
          sx={{
            mb: 3,
            p: 1.5,
            borderRadius: "8px",
            bgcolor: "rgba(71,192,210,0.08)",
            border: "1px solid",
            borderColor: "secondary.main",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main", fontSize: "13px" }}>
            Step 2 — Completed
          </Typography>
        </Box>
      )}

      {!isReadOnly && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 0.5,
              fontSize: { xs: "20px", sm: "24px" },
            }}
          >
            {t("Verify Your Account")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "14px" }}>
            {t("We've sent a verification code to your email")}
          </Typography>
        </Box>
      )}

      {/* OTP Inputs */}
      <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: 400, mx: "auto", mb: 2 }}>
        {[0, 1, 2, 3, 4].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              borderRadius: "8px",
              border: "1px solid",
              borderColor: verificationError ? "error.main" : focusedIndex === index ? "secondary.main" : "rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "border-color 0.2s",
              bgcolor: verificationError ? "error.light" : "transparent",
            }}
          >
            <input
              disabled={verificationError || isReadOnly}
              maxLength={1}
              ref={(el) => { inputsRef.current[index] = el!; }}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
                pasted.split('').forEach((char, i) => {
                  if (inputsRef.current[i]) {
                    inputsRef.current[i].value = char;
                  }
                });
                const nextIndex = Math.min(pasted.length, 4);
                inputsRef.current[nextIndex]?.focus();
                const allFilled = inputsRef.current.every((input) => input && input.value.trim() !== '');
                setValid(allFilled);
              }}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                color: verificationError ? "#EF4444" : "#1B2351",
                backgroundColor: "transparent",
                borderRadius: "8px",
              }}
            />
            {!verificationError && (
              <Box
                sx={{
                  position: "absolute",
                  width: 12,
                  height: 1.5,
                  bgcolor: "#AEAEAE",
                  top: focusedIndex === index || inputsRef.current[index]?.value ? "75%" : "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "top 0.25s ease",
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Timer / Resend */}
      {!isReadOnly && (
        !verificationError ? (
          <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ mb: 3 }}>
            {timeLeft > 0 ? (
              <>
                <TimerIcon2 />
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "13px" }}>
                  {formattedTime}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "11px" }}>
                  This may take up to 1 minute.
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                onClick={handleResend}
                sx={{ color: "primary.main", cursor: "pointer", fontWeight: 500, fontSize: "13px" }}
              >
                Resend code
              </Typography>
            )}
          </Stack>
        ) : (
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="body2" color="error" fontWeight={500} fontSize="13px">
              {verifyErrorMessage || resendErrorMessage}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="caption" color="text.secondary" fontSize="11px">
                You can resend after
              </Typography>
              <TimerIcon2 color="#EF4444" />
              <Typography variant="body2" fontWeight={500} fontSize="12px" color="error">
                {formattedTime}
              </Typography>
            </Stack>
            <Box>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleResend}
                disabled={timeLeft > 0 || resendPending}
                sx={{ textTransform: "none", fontWeight: 600, fontSize: "14px", py: 1, borderRadius: "8px", maxWidth: 200 }}
              >
                {resendPending ? <CircularProgress size={20} sx={{ color: "black" }} /> : "Resend"}
              </Button>
            </Box>
          </Stack>
        )
      )}

      {!isReadOnly && (
        <>
          {/* Error message from API */}
          {isErrorShown() && (
            <Typography variant="body2" color="error" fontWeight={500} sx={{ mb: 2 }}>
              {verifyErrorMessage}
            </Typography>
          )}

          {/* Verify Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleVerify}
                disabled={!valid || verifyPending}
                sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
              >
                {verifyPending ? (
                  <CircularProgress size={24} sx={{ color: "black", p: "5px" }} />
                ) : (
                  t("Verify Code")
                )}
              </Button>
            </Box>
          </Box>

          {/* Help card */}
          <Box
            sx={{
              bgcolor: "#DDEEFD",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              mb: 2,
            }}
          >
            <QuestionMarkIcon style={{ flexShrink: 0, marginTop: 1 }} />
            <Typography variant="caption" sx={{ color: "#136EBF", lineHeight: 1.5, fontSize: "11px" }}>
              If you're experiencing issues with verification, please check your spam folder or reach out to our support team for help.
            </Typography>
          </Box>

          {/* Contact Support */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="body2" sx={{ color: "#136EBF", fontWeight: 500, fontSize: "14px" }}>
              Contact Support
            </Typography>
          </Stack>
        </>
      )}

      {isReadOnly && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={onSuccess}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "16px", py: 1.5, borderRadius: "8px" }}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

  function isErrorShown() {
    return Boolean(verifyErrorMessage) && !verificationError;
  }
}
