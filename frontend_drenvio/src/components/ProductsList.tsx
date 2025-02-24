import React, { useState } from "react";
import { Table, Spinner, Container } from "react-bootstrap";
import { Product, Result } from "../types/product";
import useDelete from "../hooks/useDelete";

interface ProductsListProps {
  products: Result<Product>;
  userId: string;
  onSpecialPriceUpdated: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, userId, onSpecialPriceUpdated }) => {
  const { deleteData, loading: deleting, error: deleteError } = useDelete(import.meta.env.VITE_API_URL + "special-prices");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleDelete = async (product: Product) => {
    setSelectedProductId(product._id);
    try {
      await deleteData({ userId, precioEspecialId: product.specialProductId });
      alert("Precio especial eliminado correctamente");
      onSpecialPriceUpdated();
    } catch (error) {
      console.error("❌ Error eliminando el precio especial:", error);
      alert("Error eliminando el precio especial");
    } finally {
      setSelectedProductId(null);
    }
  };

  if (deleteError) return <p className="text-danger">Ocurrió un error</p>;

  return (
    <Container className="pt-1">
      <h3 className="mb-1">Lista de Productos</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th><th>Categoría</th><th>Precio</th><th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                {product.specialPrice ? (
                  <>
                    <span className="text-muted text-decoration-line-through" style={{ fontSize: "0.9em" }}>
                      ${product.price}
                    </span>{" "}
                    <span className="fw-bold text-danger" style={{ fontSize: "1.2em" }}>
                      ${product.specialPrice}
                    </span>
                  </>
                ) : (
                  <span className="fw-normal" style={{ fontSize: "1em" }}>
                    ${product.price}
                  </span>
                )}
              </td>
              <td className="text-center">
                {product.specialPrice && (
                  <span
                    role="button"
                    onClick={() => handleDelete(product)}
                    style={{ cursor: "pointer", color: "red", fontSize: "1.2em" }}
                  >
                    {deleting && selectedProductId === product._id ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <i className="bx bx-trash"></i>
                    )}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductsList;
