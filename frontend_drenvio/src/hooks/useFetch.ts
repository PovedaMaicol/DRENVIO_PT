import { useState } from "react";
import { Product } from "../types/product";


type ResultUseFetch = [Product[], (url: string) => void];
const useFetch = (): ResultUseFetch => {

const [data, setData] = useState<Product[]>([]);

const fetchData = async (url: string) => {
   const respone = await fetch(url);
   const result = await respone.json();
   setData(result);
}


return [data, fetchData] 

}

export default useFetch;