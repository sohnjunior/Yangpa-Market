interface ICategory {
  title: string;
}

interface IProduct {
  title: string;
  category: ICategory;
  image: string;
  like: number;
  price: number;
}

interface IProductSearchResult extends IProduct {
  id: number;
  sold: boolean;
  post: { title: string; body: string; hit: number };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface User {
  email: string;
  nickname: string;
}

interface IPost {
  id: number;
  title: string;
  body: string;
  hit: number;
  product: IProduct;
  user: User;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface Review extends IPost {
  image: string;
  like: number;
  rating: number;
}

interface DashBoardAsideMenuItem {
  title: string;
  to: string;
}

interface CategoryOption {
  text: string;
  value: string;
}

interface IProductDetailInfo {
  image: string;
  title: string;
  like: number;
  price: number;
  sold: boolean;
}

interface IUserInfo {
  email: string;
  nickname: string;
}

interface ICategoryMap {
  [index: string]: string;
}

export {
  IProduct,
  IProductSearchResult,
  User,
  IPost,
  DashBoardAsideMenuItem,
  Review,
  CategoryOption,
  IProductDetailInfo,
  IUserInfo,
  ICategoryMap,
};
