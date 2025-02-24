import { useState } from "react";
import { Result, Product } from "../types/product";
import { User } from "../types/user";

interface UploadProps {
  usersFilter: Result<User>,
  usersError: string | null
  usersLoading: boolean,
  products: Result<Product>,
  productsError: string | null
  productsLoading: boolean, 
}

const Upload: React.FC<UploadProps>= ({ usersFilter, usersLoading, usersError, products, productsLoading, productsError }) => {
  const [price, setPrice] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  if (usersLoading || productsLoading) {
    return <p>Cargando...</p>;
  }

  if (usersError || productsError) {
    return <p>Error al cargar los datos</p>;
  }

  // 🔹 Filtramos usuarios antes del return principal



  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };


  console.log("Usuarios filtrados:", usersFilter);
  console.log("Productos disponibles:", products);

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-4">Formulario de Upload</h2>
      
      <label className="block mb-2">Seleccionar Usuario:</label>
      <select 
        value={selectedUser} 
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="">Seleccione un usuario</option>
        {usersFilter.map((user) => (
          <option key={user._id} value={user.nombre}>{user.nombre}</option>
        ))}
      </select>
      
      <label className="block mb-2">Seleccionar Producto:</label>
      <select 
        value={selectedProduct} 
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="">Seleccione un producto</option>
        {products?.map((product) => (
          <option key={product._id} value={product.name}>{product.name} - ${product.price}</option>
        ))}
      </select>
      
      <label className="block mb-2">Precio de oferta:</label>
      <input 
        type="number" 
        value={price} 
        onChange={handlePriceChange}
        className="border p-2 w-full mb-4 rounded"
      />
      
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Enviar</button>
    </div>
  );
};

export default Upload;
