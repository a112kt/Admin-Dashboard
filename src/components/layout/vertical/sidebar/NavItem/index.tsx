"use client";
import { CustomizerContext } from "@/context/customizerContext";
import {
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  children?: NavGroup[];
  chip?: string;
  chipcolor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

export default function NavItem({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}: ItemType) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const { isBorderRadius, activeMode } = useContext(CustomizerContext);

  const theme = useTheme();
  const { t } = useTranslation();

  const Iconcolor =
    pathDirect === item?.href ? theme.palette.secondary.main : "inherit";

  const itemIcon = Icon ? (
    level > 1 ? (
      <Icon icon={item.icon || ""} height={14} />
    ) : (
      <Icon icon={item.icon || ""} height={24} color={Iconcolor} />
    )
  ) : null;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "6px 10px",
    borderRadius: isBorderRadius / 1.5,
    backgroundColor:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.light}!important`
        : "transparent",
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.blackColor.black80,


    paddingLeft: hideMenu
      ? "7px"
      : (level ?? 2) > 2
        ? `${(level ?? 1) * 15}px`
        : "10px",

    "&:hover": {
      backgroundColor: theme.palette.primary.light,

      // color: theme.palette.primary.main,
    },

    "&.Mui-selected": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href}>
        <ListItemStyled
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={lgDown ? onClick : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color:
                level > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? (
              ""
            ) : (
              <Typography variant="caption" fontSize="15px" fontWeight={400}>
                {t(`${item?.title}`)}
              </Typography>
            )}
            <br />
            {item?.subtitle && !hideMenu ? (
              <Typography variant="caption" fontSize="15px" fontWeight={400}>
                {item.subtitle}
              </Typography>
            ) : null}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}
