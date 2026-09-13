import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { CustomizerContext } from "@/context/customizerContext";
import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import Notifications from "../../vertical/brandHeader/Notification";
import Cart from "../../vertical/brandHeader/Cart";
import Profile from "../../vertical/brandHeader/Profile";
// import Search from "../../vertical/brandHeader/Search";
import Language from "../../vertical/brandHeader/Language";

import NewLogo from "../../shared/logo/NewLogo";
import config from "@/context/config";



const TopbarHeight = config.topbarHeight;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",

  [theme.breakpoints.up("lg")]: {
    minHeight: TopbarHeight,
  },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  color: `${theme.palette.text.secondary} !important`,

}));

const Header = () => {
  const [searchText, setSearchText] = React.useState("");

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  // drawer
  const {
    isLayout,
    setIsMobileSidebar,
    isMobileSidebar,
    activeMode,
    setActiveMode,
  } = React.useContext(CustomizerContext);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (

    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled

        sx={{
          maxWidth: isLayout === "boxed" ? "1368px" : "100%!important",
        }}
      >
        <Box sx={{ width: lgDown ? "45px" : "auto", overflow: "hidden" }}>
          <NewLogo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMobileSidebar(!isMobileSidebar)}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ""
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <Search value={searchText} onChange={handleSearchChange} /> */}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Cart />
          <IconButton size="small" color="inherit">
            {activeMode === "light" ? (
              <IconMoon
                size="21"
                stroke="1.5"
                onClick={() => setActiveMode("dark")}
              />
            ) : (
              <IconSun
                size="21"
                stroke="1.5"
                onClick={() => setActiveMode("light")}
              />
            )}
          </IconButton>
          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>

  );
};
export default Header;
