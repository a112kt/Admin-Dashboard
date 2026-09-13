"use client";
import { ListSubheader, styled, Theme } from "@mui/material";
import { IconDots } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}

const NavGroup = ({ item, hideMenu }: ItemType) => {
  const { t } = useTranslation();
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: 600,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: "blackColor.black80",
    lineHeight: "26px",
    padding: "3px 12px",
    marginLeft: hideMenu ? "" : "-10px",
  }));

  return (
    <ListSubheaderStyle>
      {hideMenu ? <IconDots size="14" /> : t(item?.subheader || '')}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
