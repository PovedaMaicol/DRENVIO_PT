import React, { useState } from "react";
import { Product, Result } from "../types/product";
import useDelete from "../hooks/useDelete";

interface ProductsListProps {
  products: Result<Product>;
  userId: string;
  onSpecialPriceUpdated: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, userId, onSpecialPriceUpdated}) => {
  const { deleteData, loading: deleting, error: deleteError } = useDelete(import.meta.env.VITE_API_URL + "special-prices");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleDelete = async (product: Product) => {
    console.log("🟢 Producto a eliminar:", product);
    setSelectedProductId(product._id);

    try {
      await deleteData({ userId, precioEspecialId: product.specialProductId });
      alert("Precio especial eliminado correctamente");
      onSpecialPriceUpdated()
    } catch (error) {
      console.error("❌ Error eliminando el precio especial:", error);
      alert("Error eliminando el precio especial");
    } finally {
      setSelectedProductId(null);
    }
  };

  if (deleteError) return <p>Ocurrió un error</p>;

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product._id} style={{ marginBottom: "10px" }}>
            <span>{product.name} - </span>
            {product.specialPrice ? (
              <>
                <span style={{ fontSize: "0.9em", textDecoration: "line-through", color: "gray" }}>
                  ${product.price}
                </span>{" "}
                <span style={{ fontWeight: "bold", color: "red" }}>${product.specialPrice}</span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
            <span> - {product.category}</span>
            {product.specialPrice && (
              <button
                disabled={deleting && selectedProductId === product._id}
                onClick={() => handleDelete(product)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {deleting && selectedProductId === product._id ? "Eliminando..." : "Eliminar Precio Especial"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
