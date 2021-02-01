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

interface IProductForm {
  [index: string]: string | Blob;
  title: string;
  image: Blob;
  category: string;
  price: string;
  description: string;
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

interface ICategoryOption {
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
  IProductForm,
  User,
  IPost,
  DashBoardAsideMenuItem,
  Review,
  ICategoryOption,
  IProductDetailInfo,
  IUserInfo,
  ICategoryMap,
};
