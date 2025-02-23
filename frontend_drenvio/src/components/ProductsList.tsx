import React from "react";
import { Product, Result } from "../types/product";

// Definir las props correctamente
interface ProductsListProps {
  products: Result<Product>; 
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  console.log("products", products);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product: Product) => ( 
          <li key={product._id}>
            {product.name} - ${product.price} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
