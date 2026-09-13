export interface OrderItemType {
  id: string;
  productName: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  image: string;
}
interface OrdersTableType {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  orderNumber: string;
  orderDate: string;
  paymentMethod: string;
  shippingAddress: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "PendingCancellation";
  total: number;
  items: OrderItemType[];
}

const ordersTableData: OrdersTableType[] = [
  {
    id: "1",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed@gmail.com",
      phone: "+20 109 555 2211",
      avatar: "/images/profile/user-1.png",
    },
    orderNumber: "#ORD-1001",
    orderDate: "2026-05-20",
    paymentMethod: "Credit Card",
    shippingAddress: "Tanta, Al Gharbia, Egypt",
    status: "Processing",
    total: 420,
    items: [
      {
        id: "1.1",
        productName: "Oversized Black Hoodie",
        quantity: 2,
        size: "L",
        color: "Black",
        price: 150,
        image: "/images/products/hoodie-black.png",
      },
      {
        id: "1.2",
        productName: "Classic White Sneakers",
        quantity: 1,
        size: "42",
        color: "White",
        price: 120,
        image: "/images/products/shoes-white.png",
      },
    ],
  },

  {
    id: "2",
    customer: {
      name: "Mohamed Ali",
      email: "mohamed@gmail.com",
      phone: "+20 101 222 7788",
      avatar: "/images/profile/user-2.png",
    },
    orderNumber: "#ORD-1002",
    orderDate: "2026-05-18",
    paymentMethod: "Cash On Delivery",
    shippingAddress: "Cairo, Egypt",
    status: "Pending",
    total: 260,
    items: [
      {
        id: "2.1",
        productName: "Beige Summer T-Shirt",
        quantity: 2,
        size: "M",
        color: "Beige",
        price: 80,
        image: "/images/products/tshirt-beige.png",
      },
      {
        id: "2.2",
        productName: "Silver Chain",
        quantity: 1,
        size: "-",
        color: "Silver",
        price: 100,
        image: "/images/products/chain-silver.png",
      },
    ],
  },

  {
    id: "3",
    customer: {
      name: "Omar Khaled",
      email: "omar@gmail.com",
      phone: "+20 100 333 1111",
      avatar: "/images/profile/user-3.png",
    },
    orderNumber: "#ORD-1003",
    orderDate: "2026-05-15",
    paymentMethod: "Visa",
    shippingAddress: "Alexandria, Egypt",
    status: "Delivered",
    total: 540,
    items: [
      {
        id: "3.1",
        productName: "Leather Jacket",
        quantity: 1,
        size: "XL",
        color: "Brown",
        price: 320,
        image: "/images/products/jacket-brown.png",
      },
      {
        id: "3.2",
        productName: "Black Cargo Pants",
        quantity: 1,
        size: "L",
        color: "Black",
        price: 220,
        image: "/images/products/cargo-black.png",
      },
    ],
  },

  {
    id: "4",
    customer: {
      name: "Sara Adel",
      email: "sara@gmail.com",
      phone: "+20 111 999 0000",
      avatar: "/images/profile/user-4.png",
    },
    orderNumber: "#ORD-1004",
    orderDate: "2026-05-11",
    paymentMethod: "Mastercard",
    shippingAddress: "Mansoura, Egypt",
    status: "Shipped",
    total: 310,
    items: [
      {
        id: "4.1",
        productName: "Pink Hoodie",
        quantity: 1,
        size: "M",
        color: "Pink",
        price: 180,
        image: "/images/products/hoodie-pink.png",
      },
      {
        id: "4.2",
        productName: "Mini Hand Bag",
        quantity: 1,
        size: "-",
        color: "White",
        price: 130,
        image: "/images/products/bag-white.png",
      },
    ],
  },

  {
    id: "5",
    customer: {
      name: "Youssef Emad",
      email: "youssef@gmail.com",
      phone: "+20 122 444 8888",
      avatar: "/images/profile/user-5.png",
    },
    orderNumber: "#ORD-1005",
    orderDate: "2026-05-09",
    paymentMethod: "Cash On Delivery",
    shippingAddress: "Giza, Egypt",
    status: "Cancelled",
    total: 190,
    items: [
      {
        id: "5.1",
        productName: "Basic White T-Shirt",
        quantity: 2,
        size: "L",
        color: "White",
        price: 95,
        image: "/images/products/tshirt-white.png",
      },
    ],
  },
];

export { ordersTableData };
export type {OrdersTableType};
