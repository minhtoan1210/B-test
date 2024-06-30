export type TProductItem = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: TProductDimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: TProductMeta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: TProductReviews[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

export type TProductDimensions = {
  depth: number;
  height: number;
  width: number;
};

export type TProductMeta = {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
};

export type TProductReviews = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type TParam = {
  skip: number;
  limit: number;
  search: string;
};
