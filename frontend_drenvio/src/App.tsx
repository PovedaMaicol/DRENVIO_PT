import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import ProductsList from "./components/ProductsList";
import Upload from "./components/Upload";
import useFetch from "./hooks/useFetch";
import { User } from "./types/user.ts";
import SelectUser from "./components/SelectUser.tsx";
import { useState, useEffect } from "react";

function App() {
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch(import.meta.env.VITE_API_URL + "usuarios");

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch(import.meta.env.VITE_API_URL + "productos");

  const [userLogin, setUserLogin] = useState<string>(""); // Ahora es un ID (string)
  const [productsWithSpecialPrice, setProductsWithSpecialPrice] = useState<[]>([]); // Almacenar productos con precios especiales

  // Efecto para actualizar los productos con precios especiales cuando cambia el usuario logueado
  useEffect(() => {
    if (userLogin && users && products) {
      // Buscar el usuario completo por su ID
      const loggedInUser = users.find((user) => user._id === userLogin);
      console.log('el usuario logueado es', loggedInUser)

      // si ahi un usuario, busque si tiene productos favoritos
      if (loggedInUser.preciosEspeciales) {
        console.log('tiene precios especiales', loggedInUser.preciosEspeciales)
      }

      if (loggedInUser) {
        const updatedProducts = products.map((product) => {
          // Verificar si el usuario tiene un arreglo specialPrice
          if (loggedInUser.specialPrice && Array.isArray(loggedInUser.specialPrice)) {
            console.log('tiene un arreglo de precios especiales', loggedInUser.specialPrice)
            // Buscar si hay un precio especial para este producto
            const specialPriceEntry = loggedInUser.specialPrice.find(
              (entry) => entry.productId === product._id
            );

            // Si existe un precio especial, actualizar el precio del producto
            if (specialPriceEntry) {
              return {
                ...product,
                price: specialPriceEntry.specialPrice, // Usar el precio especial
              };
            }
          }

          // Si no hay precio especial, devolver el producto con el precio por defecto
          return product;
        });

        // Actualizar el estado con los productos modificados
        setProductsWithSpecialPrice(updatedProducts);
      } else {
        // Si no se encuentra el usuario, usar los productos originales
        setProductsWithSpecialPrice(products);
      }
    } else {
      // Si no hay usuario logueado, usar los productos originales
      setProductsWithSpecialPrice(products || []);
    }
  }, [userLogin, users, products]);

  // Filtrar usuarios con role definido
  const filterUser: User[] = users ? users.filter((user: User) => user.role) : [];

  console.log("ID del usuario logueado:", userLogin);


  return (
    <>
      <NavBar />
      <SelectUser
        usersFilter={filterUser}
        usersLoading={usersLoading}
        usersError={usersError}
        userLogin={userLogin}
        setUserLogin={setUserLogin}
      />
      <Routes>
        <Route
          path="/"
          element={<ProductsList products={productsWithSpecialPrice} />} // Pasar productos con precios especiales
        />
        <Route
          path="/upload"
          element={
            <Upload
              products={productsWithSpecialPrice} // Pasar productos con precios especiales
              productsLoading={productsLoading}
              productsError={productsError}
              usersFilter={filterUser}
              usersLoading={usersLoading}
              usersError={usersError}
              userLogin={userLogin} // Pasar el ID del usuario logueado
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;