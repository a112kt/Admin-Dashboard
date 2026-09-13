"use client";
import { Typography, Box, useTheme, Stack } from "@mui/material";
import { Suspense } from "react";
// import "./EnterOtpStep.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Gradient_Button from "@/components/ui/buttons/gradientButton";
import { useSearchParams } from "next/navigation";
import { useVerify, useResendCode } from "../hooks/useVerify";
import { display } from "@mui/system";
import { PhoneIcon, QuestionMarkIcon, TimerIcon2 } from "@/components/ui/icons/icons";
import SuccessCard from "./SuccessCard";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/context/authContext";
import { CircularProgress } from "@mui/material";


export default function EnterOtpStep() {
  const { email, setStep, setToken, setVerificationTimer: setTimeLeft, verificationTimer: timeLeft, verificationErrorState: verificationError, setVerificationErrorState: setVerificationError }: AuthContextType = useContext(AuthContext);
  const router = useRouter();






  const { mutate: verify, data, isPending: verifyPending, isSuccess: verifySuccess, errorMessage: verifyErrorMessage, error: verifyError } = useVerify(onSuccessFunction)
  function onSuccessFunction(data: any) {
    setToken(data);
    setStep(2)
    router.push("/auth/register");
  }




  const { mutate: resendOtp, isPending: resendPending, errorMessage: resendErrorMessage } = useResendCode(() => {
    setVerificationError(false);
    inputsRef.current.forEach((input) => (input.value = ""));
    // inputsRef.current = [];
  })


  // const { mutate, isPending, isSuccess, isError, data } = useVerificaion();
  const t = useTheme();
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  // const [verificationError, setVerificationError] = useState<boolean>(false);
  const [valid, setVaild] = useState<boolean>(false);
  // ✅ حالة التايمر

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(Number(timeLeft) - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formattedTime = `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  async function handleResend() {
    const res = await resendOtp(email);
    // setMessage(res.data);
    // console.log(email);
    // console.log(res.data);
    // console.log(res.statusCode);
    // if (res.data === "OTP resent successfully.") {
    //   inputsRef.current.forEach((input) => (input.value = ""));
    //   setTimeLeft(60);
    //   inputsRef.current = [];
    //   setVerificationError(false);
    // } else {
    //   // Alert.alert("Error", res.data);
    // }
  }
  function handleVerify() {

    console.log("here is otp is being sent ");
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    console.log(otp);
    console.log("here is otp is being sent +++++++++");
    console.log({ email: email.toString(), otp: otp.toString() });
    verify({ email: email.toString(), otp: otp.toString() });
  }
  //   useEffect(() => {
  //   setValid(inputsRef.current.every((c) => c.length === 1));
  // }, [inputsRef.current]);

  useEffect(() => {
    if (verifyError && verifyError.response?.status === 400) {
      console.log(verifyError.response?.status);
      setVerificationError(true);
    }
  }, [verifyError]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        {/* ✅ الصورة */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "-20px",
            // width: { xs: "180px", sm: "220px", md: "265px" },
            // height: { xs: "180px", sm: "220px", md: "265px" },
            mx: "auto",
          }}
        >
          <Image
            src={
              verificationError
                ? '/images/states/verification-error.png'
                : "/images/states/verification.png"
            }
            alt="Verification illustration"
            width={255}
            height={225}
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* ✅ العنوان */}
        <Stack direction={"column"} mt={"15px"}>
          <Typography
            sx={{
              // fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "36px",
              color: verificationError ? "#EF4444" : "primary.main",
              marginTop: verificationError ? "10px" : "0",
            }}
          >
            Verify Your Account
          </Typography>

          {/* ✅ الوصف */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "24px",
              color: verificationError
                ? "typographyColors.danger"
                : "#4B5563",
              marginTop: "5px",
              [t.breakpoints.down("md")]: {
                fontSize: "11px",
                lineHeight: "20px",
              },
              [t.breakpoints.down("sm")]: {
                fontSize: "10px",
                lineHeight: "18px",
              },
            }}
          >
            We've sent a verification code to your email
          </Typography>
        </Stack>

        {/* ✅ خانات OTP + التايمر + النص */}
        <Stack width={"100%"} mx={"auto"}>
          <Box
            sx={{
              // backgroundColor: "gold",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              // gap: "30px",
              marginTop: "24px",
              // [t.breakpoints.down("md")]: {gap: "20px", marginTop: "20px" },
              // [t.breakpoints.down("sm")]: {gap: "12px", marginTop: "16px" },
            }}
          >
            {[0, 1, 2, 3, 4].map((_, index) => (
              <Box

                key={index}
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor: verificationError ? "border.danger" : "background.heavy",
                  // borderWidth: "1px",
                  // borderStyle: "solid",
                  // backgroundColor: verificationError ? "background.danger" : "background.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  [t.breakpoints.down("md")]: { width: "50px", height: "50px" },
                  [t.breakpoints.down("sm")]: { width: "40px", height: "40px" },
                }}
              >
                <input
                  disabled={verificationError}
                  maxLength={1}
                  ref={(el) => {
                    inputsRef.current[index] = el!;
                  }}
                  onChange={(e) => {
                    handleChange(index, e);

                    const allFilled = inputsRef.current.every(
                      (input) => input && input.value.trim() !== ""
                    );

                    setVaild(allFilled);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(index, e);
                  }}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "100%",
                    height: "100%",
                    // borderColor: verificationError ? "#EF4444" : "#50546E",
                    borderRadius: "8px",
                    // borderWidth: "1px",
                    border: "none",
                    outline: "none",
                    textAlign: "center",
                    fontSize: "24px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    color: verificationError ? "#EF4444" : "#1B2351",
                    backgroundColor: verificationError
                      ? "#FEE2E2"
                      : "white",
                  }}
                />

                {/* ✅ الخط الرمادي */}
                {!verificationError && <Box
                  sx={{
                    position: "absolute",
                    width: "12px",
                    height: "1.5px",
                    background: "#AEAEAE",
                    top:
                      focusedIndex === index || inputsRef.current[index]?.value
                        ? "75%"
                        : "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    transition: "top 0.25s ease",
                  }}
                />}
              </Box>
            ))}
          </Box>
          {/* No Error State */}

          {!verificationError ? (

            <Box>
              {/* ✅ التايمر */}
              {timeLeft > 0 && <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px", mt: "10px" }}>
                <Stack flexDirection={"row"} gap={"2px"} alignItems={"center"}>
                  <TimerIcon2 />
                  <Typography sx={{ fontSize: "14px", fontWeight: 500, marginTop: "2px" }}>
                    {formattedTime}
                  </Typography>
                </Stack>


                {/* ✅ النص اللي تحت التايمر */}
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "10px",
                    lineHeight: "20px",
                    color: "typographyColors.subtitle",
                    background: "transparent",
                    opacity: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  This may take up to 1 minute.
                </Typography>
              </Box>}
              {timeLeft <= 0 && <Box>
                <Typography textAlign="start" mt={"10px"} mb={"20px"} color={'primary.main'} sx={{ cursor: 'pointer' }} fontSize={"14px"} fontWeight={"400"}>
                  Resend code
                </Typography>


              </Box>}

              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  [t.breakpoints.down("md")]: { marginTop: "50px" },
                  [t.breakpoints.down("sm")]: { marginTop: "40px" },
                }}
              >
                <Gradient_Button
                  disabled={!valid}
                  state="primary"
                  onClick={() => {
                    handleVerify();
                  }}
                >
                  {!verifyPending && <Typography sx={{ fontSize: "16px", fontWeight: 400, padding: "8px" }}>
                    Verify Code
                  </Typography>}
                  {verifyPending && <CircularProgress size={24} sx={{ color: "white", margin: "10px" }} />}
                </Gradient_Button>
              </Box>
            </Box>

          ) :

            (
              <Stack>
                <Typography mt={"10px"} sx={{ color: "typographyColors.danger", fontSize: "12px", fontWeight: "400", lineHeight: "20px" }}>
                  {verifyErrorMessage || resendErrorMessage}
                </Typography>
                <Box
                  mx={"auto"}
                  // bgcolor={"green"}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // marginTop: "10px",
                    width: "70%",
                    // mx: "auto",
                    padding: "0px",
                    height: "20px",
                  }}
                >
                  <div style={{ flex: 1, height: 1, backgroundColor: "#EF4444" }} />
                  <p
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontFamily: "Inter",
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#6F7073",
                    }}
                  >
                    or
                  </p>
                  <div style={{ flex: 1, height: 1, backgroundColor: "#EF4444" }} />
                </Box>
                <Stack flexDirection={"row"} alignItems={"center"} gap={"4px"} justifyContent={"center"}>
                  <Typography sx={{ color: "typographyColors.danger", fontSize: "12px", fontWeight: "400", lineHeight: "20px" }}>
                    You can resend after
                  </Typography>
                  <Stack flexDirection={"row"} gap={"2px"} alignItems={"center"}>
                    <TimerIcon2 color="#EF4444" />
                    <Typography sx={{ fontSize: "12px", fontWeight: 500, marginTop: "2px", color: "typographyColors.danger" }}>
                      {formattedTime}
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    [t.breakpoints.down("md")]: { marginTop: "50px" },
                    [t.breakpoints.down("sm")]: { marginTop: "40px" },
                  }}
                >
                  <Gradient_Button
                    disabled={timeLeft > 0}
                    state="danger"
                    onClick={() => {
                      handleResend()
                    }}
                  >
                    {resendPending ? <CircularProgress size={24} sx={{ color: "white", margin: "10px" }} /> : <Typography sx={{ fontSize: "16px", fontWeight: 400, padding: "8px" }}>
                      Resend
                    </Typography>}
                  </Gradient_Button>
                </Box>
              </Stack>
            )

          }

          {/* Error State */}





        </Stack>

        {/* ✅ الزرار Verify Code */}


        {/* ✅ البوكس الجديد (الهيلب) */}
        <Box
          sx={{
            width: "316px",
            height: "80px",
            borderRadius: "12px",
            background: verificationError ? "#FEE2E2" : "#DDEEFD",
            margin: "32px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "12px 16px",
            gap: "10px",
            [t.breakpoints.down("md")]: { width: "280px", height: "70px" },
            [t.breakpoints.down("sm")]: { width: "260px", height: "65px" },
          }}
        >
          <QuestionMarkIcon color={verificationError ? "#EF4444" : "#136EBF"} />

          <Typography
            sx={{
              width: "256px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: verificationError ? "#EF4444" : "#136EBF",
              textAlign: "left",
              [t.breakpoints.down("sm")]: {
                fontSize: "9px",
                lineHeight: "13px",
              },
            }}
          >
            If you’re experiencing issues with verification, please check your
            spam folder or reach out to our support team for help.
          </Typography>
        </Box>

        {/* ✅ Contact Support */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "16px",
            cursor: "pointer",
            [t.breakpoints.down("sm")]: { marginTop: "12px" },
          }}
        >
          <PhoneIcon color={verificationError ? "#EF4444" : "#136EBF"} />
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: verificationError ? "#EF4444" : "#136EBF",
              textAlign: "center",
              verticalAlign: "middle",
              [t.breakpoints.down("sm")]: { fontSize: "14px" },
            }}
          >
            Contact Support
          </Typography>
        </Box>
      </Box>
      {false && <SuccessCard />}
    </Suspense >
  );
}
