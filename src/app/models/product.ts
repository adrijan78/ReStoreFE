export interface Product {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  brand: string;
  type?: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  filterByBrand: string[];
  filterByType: string[];
  pageNumber: number;
  pageSize: number;
  totalCount:number,
  totalPages:number
}
