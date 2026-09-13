"use client"
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import Image from "next/image";

const ProductCarousel = ({ mediaUrls }: { mediaUrls: string[] }) => {
  const [state, setState] = React.useState<{ nav1: any; nav2: any }>({ nav1: null, nav2: null });
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

  useEffect(() => {
    console.log(mediaUrls)
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: "centerThumb",
    speed: 500,
  };

  return (
    <Box>
      <Slider asNavFor={nav2} ref={slider1} arrows={false}>
        {mediaUrls.map((mediaUrl, index) => (
          <Box key={index}>
            <Image src={mediaUrl} width={500} height={500} alt={"product image"} style={{ borderRadius: '5px', width: '100%', height: 'auto' }} />
          </Box>
        ))}
      </Slider>
      <Slider asNavFor={nav1} ref={slider2} {...settings}>
        {/* <Box sx={{ p: 1, cursor: "pointer" }}>
          <Image src={mediaUrls[0]} alt={"product image"} width={72} height={72} style={{ borderRadius: '5px' }} />
        </Box> */}
        {mediaUrls.map((mediaUrl, index) => (
          <Box key={index} sx={{ p: 1, cursor: "pointer" }}>
            <Image src={mediaUrl} alt={"product image"} width={72} height={72} style={{ borderRadius: '5px' }} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
