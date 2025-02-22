import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Product } from "../types/product";

const ProductsList = () => {
  const [ products, setProducts] = useFetch();

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    setProducts(url);
    console.log(setProducts)
  }, []);

console.log('products', products)
  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product?.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;