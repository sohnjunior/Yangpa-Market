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

interface DashBoardAsideMenu {
  title: string;
  to: string;
}

export { Category, Product, User, Post, DashBoardAsideMenu, Review };
