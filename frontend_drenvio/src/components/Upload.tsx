import { useState } from "react";
import { Result, Product } from "../types/product";
import { User } from "../types/user";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Spinner, Alert } from "react-bootstrap";

interface UploadProps {
  usersFilter: Result<User>,
  usersError: string | null,
  usersLoading: boolean,
  products: Result<Product>,
  productsError: string | null,
  productsLoading: boolean,
  onSpecialPriceUpdated: () => Promise<void>;
}

const Upload: React.FC<UploadProps> = ({ 
  usersFilter, 
  usersLoading, 
  usersError, 
  products, 
  productsLoading, 
  productsError, 
  onSpecialPriceUpdated,
}) => {
  const { postData, loading, error } = usePost(import.meta.env.VITE_API_URL + "special-prices");
  const navigate = useNavigate();

  const [price, setPrice] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  if (usersLoading || productsLoading) return <Spinner animation="border" className="d-block mx-auto mt-3" />;
  if (usersError || productsError) return <Alert variant="danger">Error al cargar los datos</Alert>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
  
    if (!selectedUser || !selectedProduct || price <= 0) {
      alert("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
      return;
    }
  
    const specialPriceData = { userId: selectedUser, productId: selectedProduct, specialPrice: price };
  
    try {
      const result = await postData(specialPriceData);
  
      if (!result || result.error) {
        alert("❌ Hubo un error al agregar el precio especial. Intente de nuevo.");
        return; 
      }
  
      alert("✅ Precio especial agregado con éxito.");
      setPrice(0);
      setSelectedUser("");
      setSelectedProduct("");
      onSpecialPriceUpdated();
      navigate('/');
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("❌ Error inesperado. Revise la consola para más detalles.");
    }
  };

  return (
    <Container className="pt-4 d-flex justify-content-center">
      <Card style={{ width: "24rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-3">Agregar Precio Especial</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Usuario</Form.Label>
              <Form.Select 
                value={selectedUser} 
                onChange={(e) => setSelectedUser(e.target.value)}
                isInvalid={!selectedUser}
              >
                <option value="">Seleccione un usuario</option>
                {usersFilter.map((user) => (
                  <option key={user._id} value={user._id}>{user.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Producto</Form.Label>
              <Form.Select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                isInvalid={!selectedProduct}
              >
                <option value="">Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio Especial</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                isInvalid={price <= 0}
              />
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Guardar Precio Especial"}
            </Button>
          </Form>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Upload;
