import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";

import { Card, type CardProps } from "../components/Card";
import api from "../services/api";

export const Home = () => {
  const [carts, setCarts] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredCarts = useMemo(() => {
    return carts.filter((c) => {
      const text = search.trim();
      const matchesText =
        text === ""
          ? true
          : [c.id, c.userId].some((v) => String(v).includes(text));

      const cartDate = new Date(c.date);
      const fromOk = startDate ? cartDate >= new Date(startDate) : true;
      const toOk = endDate ? cartDate <= new Date(endDate) : true;

      return matchesText && fromOk && toOk;
    });
  }, [carts, search, startDate, endDate]);

  const importData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/import");

      if (response.data.code === 200) {
        toast.success("Dados importados com sucesso!");

        try {
          const response = await api.get("/carts");
          setCarts(response.data);
        } catch (error) {
          console.error(error);
          toast.error("Erro ao setar carrinhos");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao importar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  return (
    <div className="space-y-6">
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

        {/* Filtros: busca e período de criação */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID ou Usuário"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">De</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Até</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            <ClipLoader color="#155dfc" />
          </div>
        ) : filteredCarts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCarts.map((cart) => (
              <Card
                key={cart.id}
                id={cart.id}
                userId={cart.userId}
                total_products={cart.total_products}
                date={cart.date}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Nenhum carrinho encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};
