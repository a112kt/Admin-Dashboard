"use client";

import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, useTheme } from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Carousel = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <BlankCard>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        {/* This Box wraps Swiper and applies styles */}
        <Box
          sx={{
            position: "relative",

            "& .swiper-pagination": {
              position: "absolute !important",
              top: "24px !important",
              left: "24px !important",
              width: "auto !important",
              zIndex: "10 !important",
              borderRadius: "4px !important",
            },
            "& .swiper-pagination-bullet-active": {
              backgroundColor: "#189674 !important",
            },
            "& .info": {
              position: "absolute",
              bottom: "24px !important",
              left: "24px !important",
              zIndex: "10 !important",
            },
          }}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {[1, 2, 3].map((_, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: 349,
                    position: "relative",
                  }}
                >
                  <Image
                    src="/images/dashboard/ecommerce/carousel/Cards.jpg"
                    alt={t('card')}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Box className="info">
                    <Typography variant="h5" sx={{ color: "white" }}>
                      {t('Boost your brand with')} <br /> {t('Reels Insights')}
                    </Typography>
                    <Button
                      href='#'
                      sx={{
                        marginTop: "0.875rem",
                        bgcolor: theme.palette.secondary.main,
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {t('Analyze Now')}
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </BlankCard>
  );
};

export default Carousel;
