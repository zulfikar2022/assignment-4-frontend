export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  avatar: string;
}
