'use client'
import React from 'react'
import { CustomizerContext } from "@/context/customizerContext";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import config from '@/context/config'
import Image from "next/image";
import { useContext } from "react";

function NewLogo() {
    const { isCollapse, isSidebarHover, activeDir } =
        useContext(CustomizerContext)

    const TopbarHeight = config.topbarHeight

    const LinkStyled = styled(Link)(() => ({
        height: TopbarHeight,
        width: isCollapse == 'mini-sidebar' && !isSidebarHover ? '40px' : '180px',
        overflow: 'hidden',
        display: 'block',
    }))


    const logoSrc = activeDir === 'rtl'
        ? '/images/logo/mainLogoAr.svg'
        : '/images/logo/mainLogo.svg'

    return (
        <LinkStyled href='/'>
            <Image
                src={logoSrc}
                alt='logo'
                height={TopbarHeight}
                width={160}
                priority
            />
        </LinkStyled>
    )
}

export default NewLogo
