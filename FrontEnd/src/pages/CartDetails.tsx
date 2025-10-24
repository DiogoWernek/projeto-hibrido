import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { toast } from "react-toastify";
import api from "../services/api";

type CartProduct = {
  productId: number;
  quantity: number;
};

type CartResponse = {
  id: number;
  userId: number;
  total_products: number;
  date: string;
  products: CartProduct[];
};

export const CartDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartResponse | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.get(`/carts/${id}`);
        setCart(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar carrinho.");
        setError("Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [id]);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer"
      >
        Voltar
      </button>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          <ClipLoader color="#155dfc" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">
          {error}
        </div>
      ) : cart ? (
        <div className="space-y-4">
          <Card
            id={cart.id}
            userId={cart.userId}
            total_products={cart.total_products}
            date={cart.date}
          />

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Produtos</h3>
            </div>
            <div className="p-6">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2 border-b">Produto ID</th>
                    <th className="text-left px-4 py-2 border-b">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((p) => (
                    <tr
                      key={`${cart.id}-${p.productId}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 border-b">{p.productId}</td>
                      <td className="px-4 py-2 border-b">{p.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          Nenhum dado encontrado para este carrinho.
        </div>
      )}
    </div>
  );
};
