import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import ProductsList from "./components/ProductsList";
import Upload from "./components/Upload";
import useFetch from "./hooks/useFetch";
import SelectUser from "./components/SelectUser.tsx";
import { useState, useEffect, useMemo } from "react";
import { User } from "./types/user.ts";
import { SpecialPriceEntry } from "./types/specialPrice.ts";
import { Product } from "./types/product.ts";

function App() {
  const location = useLocation(); // Obtener la ruta actual

  const {
    data: users = [],
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch(import.meta.env.VITE_API_URL + "usuarios");

  const {
    data: products = [],
    loading: productsLoading,
    error: productsError,
  } = useFetch(import.meta.env.VITE_API_URL + "productos");

  const [userLogin, setUserLogin] = useState<string>(""); 
  const [productsWithSpecialPrice, setProductsWithSpecialPrice] = useState<SpecialPriceEntry[]>([]); 
  const [userId, setUserId] = useState("");

  // Filtrar solo usuarios con `role`
  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => user.role);
  }, [users]);

  useEffect(() => {
    const loggedInUser = users.find((user: User) => user._id === userLogin) as User | undefined;

    if (loggedInUser) {
      setUserId(loggedInUser._id);
      setProductsWithSpecialPrice(loggedInUser.preciosEspeciales || []);
    } else {
      setProductsWithSpecialPrice([]);
    }
  }, [userLogin, users]);

  useEffect(() => {
    if (!userLogin) return;
    
    const updatedUser = users.find((user: User) => user._id === userLogin) as User | undefined;
    if (updatedUser) {
      setProductsWithSpecialPrice(updatedUser.preciosEspeciales || []);
    } else {
      setProductsWithSpecialPrice([]);
    }
  }, [users, userLogin]);

  // Mapeo de productos con los precios especiales
  const newProducts: Product[] = useMemo(() => {
    return products.map((product: Product) => {
      const specialPriceEntry = productsWithSpecialPrice.find((p: SpecialPriceEntry) => p.productId === product._id);
      return specialPriceEntry
        ? { ...product, specialPrice: specialPriceEntry.specialPrice, specialProductId: specialPriceEntry._id }
        : product;
    });
  }, [products, productsWithSpecialPrice]);

  const handleSpecialPriceUpdated = async (): Promise<void> => {
    await refetchUsers();
    const updatedUser = users.find((user: User) => user._id === userLogin) as User | undefined;
    if (updatedUser) {
      setProductsWithSpecialPrice(updatedUser.preciosEspeciales || []);
    } else {
      setProductsWithSpecialPrice([]);
    }
  };

  return (
    <div>
      <NavBar />
      <br />
      
      {/* Mostrar SelectUser solo si NO estamos en "/upload" */}
      {location.pathname !== "/upload" && (
        <SelectUser
          usersFilter={filteredUsers} 
          usersLoading={usersLoading}
          usersError={usersError}
          userLogin={userLogin}
          setUserLogin={setUserLogin}
        />
      )}

      <Routes>
        <Route 
          path="/" 
          element={<ProductsList 
            products={newProducts} 
            userId={userId} 
            onSpecialPriceUpdated={handleSpecialPriceUpdated} 
          />} 
        />
        <Route
          path="/upload"
          element={
            <Upload
              products={newProducts}
              productsLoading={productsLoading}
              productsError={productsError}
              usersFilter={filteredUsers}
              usersLoading={usersLoading}
              usersError={usersError}
              onSpecialPriceUpdated={handleSpecialPriceUpdated}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
