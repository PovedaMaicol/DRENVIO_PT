import {  Route, Routes  } from "react-router-dom";

import NavBar from "./components/NavBar.tsx";
import ProductsList from "./components/ProductsList";
import Upload from "./components/Upload";
import useFetch from "./hooks/useFetch";

function App() {

  const { data: users, loading: usersLoading, error: usersError } = useFetch(import.meta.env.VITE_API_URL + 'usuarios');
  const { data: products, loading: productsLoading, error: productsError } = useFetch(import.meta.env.VITE_API_URL + 'productos');


  console.log('en app products:', products)
  return (
      <>
      <NavBar />
      <Routes>
        <Route path="/" 
        element={<ProductsList products={products}/>} 
        />

        <Route path="/upload" 
        element={<Upload 
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        users={users} 
        usersLoading={usersLoading}
        usersError={usersError}
        />
        } 
        />
      </Routes>
      </>
  )
}

export default App
