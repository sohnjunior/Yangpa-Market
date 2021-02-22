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
}

interface IBuyer extends ISeller {}

interface IProduct {
  id: number;
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
  [index: string]: string | File[];
  name: string;
  images: File[];
  category: string;
  price: string;
  description: string;
}

interface IUserSignupForm {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  contact: string;
  avatar: File | null;
}

interface IDashBoardAsideMenuItem {
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
  IUserSignupForm,
  ISeller,
  IBuyer,
  IDashBoardAsideMenuItem,
  ICategoryOption,
  IUserInfo,
  ICategoryMap,
};
