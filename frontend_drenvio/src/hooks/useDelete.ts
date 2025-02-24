import { useState } from "react";

const useDelete = (url: string) => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (body: object) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();


      if (!response.ok) {
        throw new Error(result.message || "Error en la petición DELETE");
      }

      setData(result);
      return result; 
    } catch (error) {
      console.error("❌ Error en useDelete:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      throw error; // 
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, data, loading, error };
};

export default useDelete;
