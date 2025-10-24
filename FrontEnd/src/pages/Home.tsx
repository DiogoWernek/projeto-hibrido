import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

import { Card } from "../components/Card";
import api from "../services/api";

export type CartData = {
  id: number;
  userId: number;
  total_products: number;
  date: string;
}

export const Home = () => {
  const [carts, setCarts] = useState<CartData[]>([]);
  const [loading, setLoading] = useState(false);

  const importData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/import");
      console.log(response.data);

      if (response.data.code === 200) {
        toast.success("Dados importados com sucesso!")

        try {
          const response = await api.get("/carts");
          setCarts(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
          toast.error("Erro ao setar carrinhos")
        }
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Erro ao importar dados")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Lista de Carrinhos */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Carrinhos</h2>
        <button 
          onClick={importData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Reimportar Dados
        </button>
        </div>
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Carregando...
          </div>
        ): carts.length > 0 ? (
          carts.map((cart) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              key={cart.id}
              id={cart.id}
              userId={cart.userId}
              total_products={cart.total_products}
              date={cart.date}
              />
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Nenhum carrinho encontrado. Clique em "Reimportar Dados" para carregar os dados.
          </div>
        )}
      </div>
    </div>
  );
};
