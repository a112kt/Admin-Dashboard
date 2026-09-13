export type ReelsType = {
  id: number;
  ownerName: string;
  title: string;
  videoUrl: string;
  status: string;
  likesCount: number;
  isLikedByCurrentUser?: boolean;
  commentsCount: number;
  productsCount: number;
  products?: ProductReel[];
  createdAt?: string;
  thumbnail?: string;
};

export type ProductReel = {
  id: number;
  name: string;
  description: string;
  arDescription?: string;
  rating: number;
  stockStatus: string;
  price: number;
};
export type FilterType = {
  Search: string;
  Status: string;
  Sort: string;
  Page: number;
};
export type CommentType = {
  id: number;
  content: string;
  userName: string;
  userImage?: string;
  commentLikeCount: number;
  isLovedByCurrentUser: boolean;
  createdAt: string;
  repliesCount: number;
};
export type ReplyType = {
  id: number;
  content: string;
  userName: string;
  userImage: string;
  likeCount: number;
  isLovedByCurrentUser: boolean;
  createdAt: string;
};
export type ProductsTableType = {
  productId: number,
  name: string,
  price: number,
  rating: number,
  imagesUrl: string[]
}
