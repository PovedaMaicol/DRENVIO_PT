// defino mis tipos
export type Category = "Electronics" | "Phones" | "Accessories"
export type Status = "Available" | "Exhausted" 

export interface SpecialPriceEntry {
    userId?: string;
    productId?: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: boolean;

}

export interface ProductEntry {
    name: string;
    description?: string;
    price: number;
    category: Category;
}