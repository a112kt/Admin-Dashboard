import { uniqueId } from "lodash";
import { IconifyIcon } from "@iconify/react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: string | IconifyIcon;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Main",
  },
  {
    id: uniqueId(),
    title: "Home",
    icon: "solar:chart-square-line-duotone",
    href: "/home",
  },

  { divider: true },
  {
    navlabel: true,
    subheader: "Management",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: "solar:box-minimalistic-line-duotone",
    children: [
      {
        id: uniqueId(),
        title: "All Products",
        icon: "solar:stop-circle-line-duotone",
        href: "/products-management/products",
      },
      {
        id: uniqueId(),
        title: "Add Product",
        icon: "solar:stop-circle-line-duotone",
        href: "/products-management/add-product",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Reels",
    icon: "solar:videocamera-record-line-duotone",
    children: [
      {
        id: uniqueId(),
        title: "All Reels",
        icon: "solar:stop-circle-line-duotone",
        href: "/reels-management/reels",
      },
      {
        id: uniqueId(),
        title: "Add Reel",
        icon: "solar:stop-circle-line-duotone",
        href: "/reels-management/add-reels",
      },
      {
        id: uniqueId(),
        title: "Reels Stats",
        icon: "solar:stop-circle-line-duotone",
        href: "/reels-management/reels-stats",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Orders Management",
    icon: "solar:box-minimalistic-line-duotone",
    navlabel: false,
    href: `/orders-management/orders`,
  },
  {
    id: uniqueId(),
    title: "Brand Profile",
    icon: "solar:shop-line-duotone",
    href: "/profile",
  },
  { divider: true },
  {
    navlabel: true,
    subheader: "Finance & Payouts",
  },
  {
    id: uniqueId(),
    title: "Finance",
    icon: "solar:wallet-money-line-duotone",
    children: [
      {
        id: uniqueId(),
        title: "Wallet Summary",
        icon: "solar:stop-circle-line-duotone",
        href: "/finance",
      },
      {
        id: uniqueId(),
        title: "Settlements",
        icon: "solar:stop-circle-line-duotone",
        href: "/finance/settlements",
      },
      {
        id: uniqueId(),
        title: "Request Withdrawal",
        icon: "solar:stop-circle-line-duotone",
        href: "/finance/withdraw",
      },
      {
        id: uniqueId(),
        title: "Withdrawal History",
        icon: "solar:stop-circle-line-duotone",
        href: "/finance/withdrawals",
      },
    ],
  },

  { divider: true },
  {
    navlabel: true,
    subheader: "Communication",
  },
  {
    id: uniqueId(),
    title: "Community",
    icon: "solar:widget-4-line-duotone",
    children: [
      {
        id: uniqueId(),
        title: "Blog",
        icon: "solar:stop-circle-line-duotone",
        href: "/community/blog",
      },
      {
        id: uniqueId(),
        title: "Add Article",
        icon: "solar:stop-circle-line-duotone",
        href: "/community/add-article",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Chat",
    icon: "solar:chat-round-dots-outline",
    href: "/chat",
  },
];

export const pendingMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Main",
  },
  {
    id: uniqueId(),
    title: "Home",
    icon: "solar:chart-square-line-duotone",
    href: "/home",
  },

  { divider: true },
  {
    navlabel: true,
    subheader: "Communication",
  },
  {
    id: uniqueId(),
    title: "Community",
    icon: "solar:widget-4-line-duotone",
    children: [
      {
        id: uniqueId(),
        title: "Blog",
        icon: "solar:stop-circle-line-duotone",
        href: "/community/blog",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Chat",
    icon: "solar:chat-round-dots-outline",
    href: "/chat",
  },
];

export function getBrandMenuItems(isApproved: boolean): MenuitemsType[] {
  return isApproved ? Menuitems : pendingMenuItems;
}

export default Menuitems;
