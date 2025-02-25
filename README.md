## **Documentación del Proyecto**

### **Introducción**

Este proyecto es una aplicación web desarrollada como parte de una prueba técnica. El objetivo es crear una interfaz en **React** (TypeScript) que interactúe con una **API en Node.js** (TypeScript) para consultar y actualizar datos en una base de datos **MongoDB**. La aplicación permite:

1. **Mostrar una lista de productos** con sus precios, ajustando el precio si el usuario tiene un precio especial.
2. **CRUD para precios especiales** POST, GET, UPDATE, DELETE.

---

### **Tecnologías utilizadas**

- **Frontend:**
  - React (TypeScript)
  - Vite (como bundler y servidor de desarrollo)
  - Bootstrap y React-Bootstrap para el diseño de la interfaz.
  - useFetch (hook personalizado) para manejar solicitudes HTTP.
  - React Router DOM para la navegación entre vistas.
  - ESLint para la calidad del código.

- **Backend:**
  - Node.js (TypeScript)
  - Express para crear la API REST.
  - Mongoose para interactuar con MongoDB.
  - CORS para permitir solicitudes desde el frontend.
  - ESLint para la calidad del código.

- **Base de datos:**
  - MongoDB (clúster proporcionado).

---

### **Estructura del proyecto**

#### **Backend**
```
/backend
├── src/
│   ├── controllers/       # Controladores para manejar las solicitudes de la API
│   ├── models/            # Modelos de MongoDB (TypeScript)
│   ├── routes/            # Rutas de la API (TypeScript)
│   ├── utils/db.ts        # Conexion monngo db
|   |── index.ts           # Punto de entrada del backend
├── .env                   # Variables de entorno
├── tsconfig.json          # Configuración de TypeScript
├── .eslint.config.mjs     # Configuración de ESLint
├── package.json           # Dependencias y scripts del backend
```

#### **Frontend**
```
/frontend
├── src/
│   ├── components/        # Componentes de React (TypeScript)
│   ├── hooks/             # Hooks para manejar solicitudes HTTP (useFetch)
│   ├── App.tsx            # Componente principal de la aplicación
│   ├── main.tsx           # Punto de entrada del frontend
├── .env                   # Variables de entorno del frontend
├── tsconfig.json          # Configuración de TypeScript
├── .eslint.config.js      # Configuración de ESLint
├── package.json           # Dependencias y scripts del frontend
```

---

### **Pasos para ejecutar localmente**

#### **1. Clonar el repositorio**
```bash
git clone https://github.com/PovedaMaicol/DRENVIO_PT.git
cd DRENVIO_PT
```

#### **2. Configurar el backend**
1. Navegar a la carpeta del backend:
   ```bash
   cd backend_drenvio
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la carpeta `backend` con la siguiente información:
   ```env
   MONGO_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/tienda
   PORT=5000
   ```
4. Ejecutar el backend en modo desarrollo:
   ```bash
   npm run dev
   ```

#### **3. Configurar el frontend**
1. Navegar a la carpeta del frontend:
   ```bash
   cd frontend_drenvio
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la carpeta `frontend` con la siguiente información:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Ejecutar el frontend en modo desarrollo:
   ```bash
   npm run dev
   ```

#### **4. Acceder a la aplicación**
- Abre tu navegador y visita `http://localhost:3000`.

---

### **Endpoints de la API**

#### **1. Obtener todos los productos**
- **Método:** `GET`
- **Ruta:** `/api/productos`
- **Respuesta:**
  ```json
  [
    {
    "_id": "6750ef7cfce1f2f80959a98b",
    "name": "Camiseta Deportiva",
    "price": 350,
    "category": "Ropa",
    "stock": 150,
    "description": "Camiseta deportiva para entrenamiento, disponible en varios colores.",
    "brand": "FitWear",
    "sku": "FW-TSH-001",
    "tags": [
      "deporte",
      "ropa",
      "entrenamiento"
    ],
    "createdAt": "2024-11-01T10:30:00Z",
    "updatedAt": "2024-11-02T14:00:00Z"
  },
  {
    "_id": "6750efb4fce1f2f80959a98d",
    "name": "Audífonos Inalámbricos",
    "price": 1200,
    "category": "Electrónica",
    "stock": 50,
    "description": "Audífonos con cancelación de ruido y batería de larga duración.",
    "brand": "SoundPlus",
    "sku": "SP-HDP-501",
    "tags": [
      "audio",
      "inalámbrico",
      "tecnología"
    ],
    "createdAt": "2024-11-01T11:00:00Z",
    "updatedAt": "2024-11-02T15:00:00Z"
  }
  ]
  ```

#### **2. Agregar un precio especial**
- **Método:** `POST`
- **Ruta:** `/api/special-prices`
- **Body:**
  ```json
  {
    "userId": "abc123",
    "productId": "12345",
    "precioEspecial": 80
  }
  ```
- **Respuesta:**
  ```json
  {
    "message": "Precio especial agregado correctamente"
  }
  ```

---

### **Uso de fetch**

Se implementaron hooks personalizados  para manejar las solicitudes HTTP. 

#### **Ejemplo de uso de `useFetch`:**
```typescript
// hooks/useFetch.ts
import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

#### **Uso en un componente:**
```typescript
// components/ProductList.tsx
import React from 'react';
import useFetch from '../hooks/useFetch';

interface Product {
  _id: string;
  nombre: string;
  precio: number;
}

const ProductList: React.FC = () => {
  const { data, loading, error } = useFetch<Product[]>('/api/productos');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data?.map((product) => (
        <li key={product._id}>
          {product.nombre} - ${product.precio}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
```

---

### **Consideraciones adicionales**

- **Desafíos enfrentados:**
  - La validación de usuarios en la colección de precios especiales requirió una optimización en las consultas a MongoDB.
  - TypeScript fue de gran ayuda para evitar errores de tipo al interactuar con la API y la base de datos.
  - ESLint ayudó a mantener un código limpio y consistente, especialmente con reglas personalizadas para TypeScript.


- **Sugerencias para futuras mejoras:**
  - Implementar autenticación de usuarios para gestionar precios especiales de manera más segura.


---


### **Licencia**

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

---
