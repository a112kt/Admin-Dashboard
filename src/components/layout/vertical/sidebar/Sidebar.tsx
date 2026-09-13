"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import { CustomizerContext } from "@/context/customizerContext";
import config from "@/context/config";
import NewLogo from "@/components/layout/shared/logo/NewLogo";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import { roleType } from "@/features/brand/auth/types/auth";
import { useContext } from "react";

const Sidebar = ({ role }: { role: roleType }) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
  const {
    isCollapse,
    isSidebarHover,
    setIsSidebarHover,
    isMobileSidebar,
    setIsMobileSidebar,

  } = useContext(CustomizerContext);
  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;
  const TopbarHeight = config.topbarHeight;

  const theme = useTheme();
  const toggleWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover
      ? MiniSidebarWidth
      : SidebarWidth;

  const onHoverEnter = () => {
    if (isCollapse == "mini-sidebar") {
      setIsSidebarHover(true);
    }
  };

  const onHoverLeave = () => {
    setIsSidebarHover(false);
  };

  const logoBoxSx = {
    height: TopbarHeight,
    flexShrink: 0,
    px: 3,
  };

  return (
    <>
      {!lgUp ? (
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            height: "100vh",
            flexShrink: 0,
            ...(isCollapse == "mini-sidebar" && {
              position: "absolute",
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar for desktop */}
          {/* ------------------------------------------- */}
          <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            slotProps={{
              paper: {
                sx: {
                  transition: theme.transitions.create("width", {
                    duration: theme.transitions.duration.shortest,
                  }),
                  width: toggleWidth,
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                },
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo (Fixed at top) */}
            {/* ------------------------------------------- */}
            <Box sx={logoBoxSx}>
              <NewLogo />
            </Box>
            {/* ------------------------------------------- */}
            {/* Sidebar Items (Scrollable) */}
            {/* ------------------------------------------- */}
            <Scrollbar sx={{ height: `calc(100% - ${TopbarHeight}px)`, flex: 1 }}>
              <SidebarItems role={role} />
            </Scrollbar>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebar}
          onClose={() => setIsMobileSidebar(false)}
          variant="temporary"
          slotProps={{
            paper: {
              sx: {
                width: SidebarWidth,
                border: "0 !important",
                boxShadow: (theme) => theme.shadows[8],
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Logo (Fixed at top) */}
          {/* ------------------------------------------- */}
          <Box sx={logoBoxSx}>
            <NewLogo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar For Mobile (Scrollable) */}
          {/* ------------------------------------------- */}
          <Scrollbar sx={{ height: `calc(100vh - ${TopbarHeight}px)`, flex: 1 }}>
            <SidebarItems role={role} />
          </Scrollbar>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;