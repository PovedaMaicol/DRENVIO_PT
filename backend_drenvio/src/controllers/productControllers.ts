import { Product } from "../models/product"
import { ProductEntry } from "../types"

// Add product
export const addProduct = async (product: ProductEntry)  => {
    const newProduct = new Product(product);
    return await newProduct.save();

}

// Get products
export const getProducts = async () => {
    const products = await Product.find();
    return products;
}

