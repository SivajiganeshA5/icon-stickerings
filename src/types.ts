export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  categoryId: string;
  description: string;
}