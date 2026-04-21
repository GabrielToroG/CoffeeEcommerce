export type StorefrontApiProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  imageUrl: string;
  categoryId: string;
  rating: number;
};
