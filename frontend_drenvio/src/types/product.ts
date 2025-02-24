export interface Product {
    _id: string;
    brand: string;
    category: string;
    description: string;
    name: string;
    price: number;
    sku: string;
    stock: number;
    tags: string[];
    updatedAt: string;
    specialPrice?: number;
    specialProductId?: string;
  }

  export type Result<T> = T[];
