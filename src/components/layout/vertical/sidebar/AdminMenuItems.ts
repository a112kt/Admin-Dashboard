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
    title: "Dashboard",
    icon: "solar:chart-square-line-duotone",
    href: "/admin/home",
  },

  { divider: true },
  {
    navlabel: true,
    subheader: "Management",
  },
  {
    id: uniqueId(),
    title: "Pending Approvals",
    icon: "solar:clipboard-check-line-duotone",
    href: "/admin/requests",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: "solar:bedside-table-3-line-duotone",
    href: "/admin/orders",
  },
  {
    id: uniqueId(),
    title: "Discount Codes",
    icon: "solar:tag-horizontal-line-duotone",
    href: "/admin/discount-codes",
  },
  {
    id: uniqueId(),
    title: "Categories",
    icon: "solar:widget-linear",
    href: "/admin/categories",
  },

  { divider: true },
  {
    navlabel: true,
    subheader: "Finance & Payouts",
  },
  {
    id: uniqueId(),
    title: "Finance Overview",
    icon: "solar:wallet-money-line-duotone",
    href: "/admin/finance",
  },
  {
    id: uniqueId(),
    title: "Brands Finance",
    icon: "solar:shop-line-duotone",
    href: "/admin/finance/brands",
  },
  {
    id: uniqueId(),
    title: "Shipping Finance",
    icon: "solar:delivery-line-duotone",
    href: "/admin/finance/shipping",
  },
  {
    id: uniqueId(),
    title: "Audit Trail",
    icon: "solar:document-text-line-duotone",
    href: "/admin/audit-trail",
  },
];

export default Menuitems;
