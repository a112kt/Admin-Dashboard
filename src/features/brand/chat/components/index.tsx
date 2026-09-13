"use client";

import React from "react";
import Box from "@mui/material/Box";
import ChatContent from "./ChatContent";
import { useMediaQuery, Theme } from "@mui/material";
import ChatListing from "./ChatListing";

const ChatApp = () => {
  // const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const smallScreens = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
  console.log(smallScreens)
  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} position={"relative"}>
      {/* ------------------------------------------- */}
      {/* Left part */}
      {/* ------------------------------------------- */}

      <ChatListing isSmallScreens={smallScreens} />
      {/* ------------------------------------------- */}
      {/* Right part */}
      {/* ------------------------------------------- */}

      <Box flexGrow={1} height={"100%"}>
        <ChatContent isSmallScreen={smallScreens}/>
      </Box>
    </Box>
  );
};

export default ChatApp;
