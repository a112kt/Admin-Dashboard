

import React, { useContext } from "react";
import Link from "next/link";

// mui imports
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/context/customizerContext";
import { ItemType } from "@/components/layout/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function NavItem({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}: ItemType) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const { isBorderRadius } = useContext(CustomizerContext);

  const theme = useTheme();
  const { t } = useTranslation();



  const itemIcon = Icon ? (
    (level ?? 1) > 1 ? (
      <Icon icon={item.icon || ''} height={14} />
    ) : (
      <Icon icon={item.icon || ''} height={20} />
    )
  ) : null;


  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    padding: "6px 10px",
    gap: '10px',
    borderRadius: isBorderRadius / 1.5,
    marginBottom: (level ?? 1) > 1 ? '3px' : '0px',
    backgroundColor: (level ?? 1) > 1 && pathDirect === item?.href ? `${theme.palette.primary.light}!important` : "inherit",
    color:
      (level ?? 1) > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }));



  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href || ''}>
        <ListItemStyled
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={lgDown ? onClick : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              p: "3px 0",
              color:
                (level ?? 1) > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? "" : <>
              <Typography variant="caption" fontSize='15px' fontWeight={400} >
                {t(`${item?.title}`)}
              </Typography>
            </>
            }
            <br />
            {item?.subtitle ? (
              <Typography variant="caption" fontSize='15px' fontWeight={400}>
                {hideMenu ? "" : item?.subtitle}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

        </ListItemStyled>
      </Link>
    </List>
  );
}

