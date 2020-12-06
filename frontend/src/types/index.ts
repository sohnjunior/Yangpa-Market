interface Category {
  title: string;
}

interface Product {
  title: string;
  category: Category;
  image: string;
  like: number;
  price: number;
}

interface User {
  email: string;
  nickname: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  hit: number;
  product: Product;
  user: User;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface Review extends Post {
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

export { Category, Product, User, Post, DashBoardAsideMenuItem, Review, CategoryOption };
