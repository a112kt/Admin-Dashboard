"use client";
import { Container } from "@mui/system";
import React, { useEffect, useContext } from "react";
import { Box, Card, LinearProgress, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthPageContainer from "@/features/brand/auth/authPageContainer/authPageContainer";
import Image from "next/image";
import { Button } from "@mui/material";
import EnterOtpStep from "@/features/brand/auth/verification/components/EnterOtpStep";
// import NewPasswordStep from "@/features/brand/auth/verification/components/NewPasswordStep";
import { useMediaQuery } from "@mui/material";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";


export default function Verification() {
    const { step, setStep }: any = useContext(AuthContext);
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 600px)");
   
    return (
        <PageContainer title="Register Page" description="this is Sample page">

            <AuthPageContainer>
                <Stack
                    zIndex={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: "100vh", flexDirection: "column" }}
                    py={{ xs: "0px", sm: "4px", md: "10px" }}
                    px={{ xs: "0px", sm: "4px", md: "10px" }}
                    mx={"0px"}
                    width={{ xs: "100vw", sm: "90vw", md: "70vw", lg: "40vw" }}
                >
                    <Card
                        sx={{ boxShadow: '0px 3px 6px 0px #0000000A', width: "100%", borderRadius: { xs: "0px", sm: "16px" }, display: "flex", flexDirection: "column", my: "0px !important", backgroundColor: "white", minHeight: { xs: "100vh", sm: "auto" } }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="center" >
                            <Image
                                src={'/images/logo/mainLogo.svg'}
                                alt='logo'
                                height={120}
                                width={120}
                                style={{ maxWidth: "320px", maxHeight: "320px", width: isMobile ? "80%" : "50%", height: isMobile ? "80%" : "50%" }}
                            />
                        </Box>
                        <Box width={{ xs: "90%", sm: "90%", md: "80%", lg: "70%" }} flexGrow={1} display={"flex"} flexDirection={"column"} alignItems={"center"} mx={"auto"} >
                            <EnterOtpStep />
                        </Box>

                    </Card>

                </Stack>
            </AuthPageContainer>


        </PageContainer >
    );
}
