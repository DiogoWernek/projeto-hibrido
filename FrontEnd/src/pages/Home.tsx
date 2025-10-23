import { useEffect } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

export const Home = () => {
  const importData = async () => {
    try {
      const response = await api.get("/import");
      console.log(response.data);

      if (response.data.code === 200) {
        toast.success(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Erro ao importar dados")
    }
  };

  useEffect(() => {
    importData();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};
