export interface Basket {
  id: number;
  buyerId: string;
  items: Item[];
}

export interface Item {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
