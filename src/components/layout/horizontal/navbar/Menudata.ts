import { uniqueId } from "lodash";

export const Menuitems = [
  {
    id: uniqueId(),
    title: "Starter",
    icon: "solar:book-line-duotone",
    href: "/",
    children: [
      {
        id: uniqueId(),
        title: "Sample Page",
        icon: "solar:stop-circle-line-duotone",
        href: "/",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Menu Level",
    icon: "solar:layers-minimalistic-line-duotone",

    href: "/menulevel/",
    children: [
      {
        id: uniqueId(),
        title: "Level 1",
        icon: "solar:stop-circle-line-duotone",
        href: "/l1",
      },
      {
        id: uniqueId(),
        title: "Level 1.1",
        icon: "solar:stop-circle-line-duotone",
        href: "/l1.1",
        children: [
          {
            id: uniqueId(),
            title: "Level 2",
            icon: "solar:stop-circle-line-duotone",
            href: "/l2",
          },
          {
            id: uniqueId(),
            title: "Level 2.1",
            icon: "solar:stop-circle-line-duotone",
            href: "/l2.1",
            children: [
              {
                id: uniqueId(),
                title: "Level 3",
                icon: "solar:stop-circle-line-duotone",
                href: "/l3",
              },
              {
                id: uniqueId(),
                title: "Level 3.1",
                icon: "solar:stop-circle-line-duotone",
                href: "/l3.1",
              },
            ],
          },
        ],
      },
    ],
  },
];
export default Menuitems;
