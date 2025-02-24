import { useState } from "react";
import { Result, Product } from "../types/product";
import { User } from "../types/user";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

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

  if (usersLoading || productsLoading) return <p>Cargando...</p>;
  if (usersError || productsError) return <p>Error al cargar los datos</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
  
    if (!selectedUser || !selectedProduct || price <= 0) {
      alert("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
      return;
    }
  
    const specialPriceData = {
      userId: selectedUser,
      productId: selectedProduct,
      specialPrice: price,
    };
  
    try {
      const result = await postData(specialPriceData);
      console.log("📡 Respuesta de la API:", result);
  
      if (!result || result.error) {
        alert("❌ Hubo un error al agregar el precio especial. Intente de nuevo.");
        return; 
      }
  
      alert("✅ Precio especial agregado con éxito.");
      setPrice(0);
      setSelectedUser("");
      setSelectedProduct("");
      onSpecialPriceUpdated(); // Se actualiza la UI antes de redirigir
      navigate('/'); // Redirige después de la actualización
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("❌ Error inesperado. Revise la consola para más detalles.");
    }
  };
  

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-4">Agregar Precio Especial</h2>
      
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Seleccionar Usuario:</label>
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        >
          <option value="">Seleccione un usuario</option>
          {usersFilter.map((user) => (
            <option key={user._id} value={user._id}>{user.nombre}</option>
          ))}
        </select>
        
        <label className="block mb-2">Seleccionar Producto:</label>
        <select 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
        
        <label className="block mb-2">Precio Especial:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full mb-4 rounded"
        />
        
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          disabled={loading} //  Deshabilita el botón mientras se envía la petición
        >
          {loading ? "Enviando..." : "Guardar Precio Especial"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Upload;
