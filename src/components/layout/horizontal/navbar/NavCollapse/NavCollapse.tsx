"use client";
import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { usePathname } from "next/navigation";

// mui imports
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { CustomizerContext } from "@/context/customizerContext";
// custom imports
import NavItem from '../NavItem/NavItem';

// plugins
import { IconChevronDown } from '@tabler/icons-react';
import { NavCollapseProps, NavGroup } from '@/components/layout/sidebar';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react/dist/iconify.js';



const NavCollapse = ({ menu, level, pathWithoutLastPart, pathDirect, hideMenu, onClick = () => { }, }: NavCollapseProps) => {

  const { t } = useTranslation();
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { isBorderRadius } = useContext(CustomizerContext);






  React.useEffect(() => {
    setOpen(false);
    menu.children?.forEach((item: NavGroup) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    width: 'auto',
    padding: '6px 10px',
    position: 'relative',
    flexGrow: 'unset',
    gap: '10px',
    borderRadius: isBorderRadius / 1.5,
    whiteSpace: 'nowrap',
    color: open || pathname.includes(menu.href || '') || level < 1 ? theme.palette.secondary.main : theme.palette.text.secondary,
    backgroundColor: open || pathname.includes(menu.href || '') ? theme.palette.primary.main : '',

    '&:hover': {
      backgroundColor:
        open || pathname.includes(menu.href || '')
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
    '&:hover > .SubNav': { display: 'block' },

  }));

  const ListSubMenu = styled((props) => <Box {...props} />)<React.PropsWithChildren<any>>(() => ({
    display: 'none',
    position: 'absolute',
    top: level > 1 ? `0px` : '35px',
    left: level > 1 ? `${level + 228}px` : '0px',
    padding: '10px',
    width: '250px',
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  }));

  const listItemProps: {
    component: string;
  } = {
    component: 'li',
  };

  //checks if the menu or any of its children is active
  const isMenuOrChildSelected = (menuItem: any, currentPath: string): boolean => {
    if (!menuItem) return false;
    if (menuItem.href === currentPath) return true;
    if (menuItem.children) {
      return menuItem.children.some((child: any) =>
        isMenuOrChildSelected(child, currentPath)
      );
    }
    return false;
  };

  const isTopLevel = level === 1;
  const active = isMenuOrChildSelected(menu, pathname);


  const menuIcon = Icon ? (
    !isTopLevel ? (
      <Icon icon={menu.icon || ''} height={14} />
    ) : (
      <Icon
        icon={menu.icon || ''}
        height={24}
        color={active ? theme.palette.secondary.main : ''}
      />
    )
  ) : null;



  // If Menu has Children
  const submenus = menu.children?.map((item: NavGroup) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu} onClick={onClick} />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu} onClick={function (): void {
            throw new Error('Function not implemented.');
          }} />
      );
    }
  });

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        {...listItemProps}
        selected={pathWithoutLastPart === menu.href}
        className={open ? 'selected' : ''}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit" sx={{ mr: 'auto' }}>
          {t(menu.title ?? '')}
        </ListItemText>
        <IconChevronDown size="1rem" />
        <ListSubMenu component={"ul"} className="SubNav">
          {submenus}
        </ListSubMenu>
      </ListItemStyled>
    </React.Fragment>
  );
};

export default NavCollapse;
