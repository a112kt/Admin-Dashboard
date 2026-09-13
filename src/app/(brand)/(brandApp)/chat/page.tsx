"use client"

import React from "react";
import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import AppCard from "@/components/ui/shared/AppCard";
import ChatApp from "@/features/brand/chat/components";
import { ChatProvider } from '@/features/brand/chat/chatContext/chatContext'
import Box from "@mui/material/Box";
import { useTranslation } from 'react-i18next';

const Chats = () => {
  const { t } = useTranslation();
    return (
        <ChatProvider>
            <PageContainer title={t('Chat')} description={t('this is Chat')}>
                {/* <Breadcrumb title="Chat" items={BCrumb} /> */}
                <Box display={"flex"} flexDirection={"column"} height={"calc(100vh - 150px)"} >
                    <AppCard >
                        <ChatApp />
                    </AppCard>
                </Box>
            </PageContainer>
        </ChatProvider>
    );
};

export default Chats;
