import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  styled,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { CustomizerContext } from "@/context/customizerContext";
import config from "@/context/config";
import Notifications from "./Notification";
import Profile from "./Profile";
import { Icon } from "@iconify/react";
// import Search from "@/components/layout/vertical/brandHeader/Search";
import Messages from "./Messages";

import NewLogo from "../../shared/logo/NewLogo";

const TopbarHeight = config.topbarHeight;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: TopbarHeight,
  },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [height, setHeight] = useState("0px");

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  const {
    isSidebarHover,
    activeMode,
    setActiveMode,
    setIsCollapse,
    isCollapse,
    setIsSidebarHover,
    isMobileSidebar,
    setIsMobileSidebar,
  } = useContext(CustomizerContext);

  const toggleWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover ? "75px" : "256px";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChange = () => {
    height == "0px" ? setHeight("auto") : setHeight("0px");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setHeight("0px");
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}

        <IconButton
          color="inherit"
          aria-label="menu"
          sx={{ marginRight: "10px" }}
          onClick={() => {
            // Toggle sidebar on both mobile and desktop based on screen size
            if (lgUp) {
              // For large screens, toggle between full-sidebar and mini-sidebar
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              isCollapse === "full-sidebar"
                ? setIsCollapse("mini-sidebar")
                : setIsCollapse("full-sidebar");
            } else {
              // For smaller screens, toggle mobile sidebar
              setIsMobileSidebar(!isMobileSidebar);
            }
          }}
        >
          <Icon icon="solar:sidebar-minimalistic-line-duotone" />
        </IconButton>
        {/* 
        {lgUp ? (
          <>
            <Search value={searchText} onChange={handleSearchChange} />
          </>
        ) : null} */}

        <Box flexGrow={1} />
        {lgUp ? (
          <Stack spacing={1} direction="row" alignItems="center">

            <IconButton
              size="small"
              onClick={() =>
                setActiveMode(activeMode === "light" ? "dark" : "light")
              }
            >
              {activeMode === "light" ? (
                <Icon icon="solar:moon-linear" height={20} color="inherit" />
              ) : (
                <Icon icon="solar:sun-line-duotone" height={20} color="inherit" />
              )}
            </IconButton>

            <Notifications />

            <Messages />

            <Profile />
          </Stack>
        ) : (

          <Box
            flexGrow={1}
            display={{ xs: "flex", lg: "none" }}
            justifyContent="center"
          >
            <NewLogo />
          </Box>
        )}
        {lgUp ? null : (
          <>
            <Box flexGrow={1} />
          </>
        )}
        {lgUp ? null : (
          <>
            <IconButton
              onClick={handleChange}
              aria-label="show 4 new mails"
              color="inherit"
              size="small"
            >
              <Icon icon="solar:menu-dots-bold" />
            </IconButton>
          </>
        )}
      </ToolbarStyled>
      <Box
        sx={{
          maxHeight: { height },
          width: "100%",
          backgroundColor: "transparent",
          transition: "all 2s ease",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          paddingX={3}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Notification Dropdown */}
            {/* ------------------------------------------- */}
            <Notifications />

            {/* ------------------------------------------- */}
            {/* Messages Dropdown */}
            {/* ------------------------------------------- */}
            <Messages />
            {/* ------------------------------------------- */}
            {/* DarkLightMode */}
            {/* ------------------------------------------- */}
            <IconButton
              size="small"
              onClick={() =>
                setActiveMode(activeMode === "light" ? "dark" : "light")
              }
            >
              {activeMode === "light" ? (
                <Icon icon="solar:moon-linear" height={20} color="inherit" />
              ) : (
                <Icon icon="solar:sun-line-duotone" height={20} color="inherit" />
              )}
            </IconButton>

            <Profile />
          </Stack>
        </Stack>
      </Box>
    </AppBarStyled>

  );
};

export default Header;
