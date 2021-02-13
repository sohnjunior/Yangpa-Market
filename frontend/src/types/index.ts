interface IPhoto {
  id: number;
  paht: string;
}

interface ICategory {
  id: number;
  type: string;
}

interface ISeller {
  id: number;
  email: string;
  nickname: string;
  isAdmin: boolean;
  contact: string;
  birthday: Date;
}

interface IProduct {
  name: string;
  photos: IPhoto[];
  price: number;
  likes: number;
  views: number;
  seller: ISeller;
  description: string;
  category: ICategory;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IRelatedProduct extends IProduct {
  score: number;
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

interface IUserInfo {
  email: string;
  nickname: string;
}

interface ICategoryMap {
  [index: string]: string;
}

export {
  IProduct,
  IRelatedProduct,
  IProductForm,
  User,
  ISeller,
  IPost,
  DashBoardAsideMenuItem,
  Review,
  ICategoryOption,
  IUserInfo,
  ICategoryMap,
};
