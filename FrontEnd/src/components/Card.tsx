import { useNavigate } from "react-router-dom";

export type CardProps = {
  id: number;
  userId: number;
  total_products: number;
  date: string;
};

export const Card = ({ id, userId, total_products, date }: CardProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/cart/${id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">
          Carrinho ID: #{id}
        </div>
        <div className="text-sm text-gray-500">
          Criado em: {formatDate(date)}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Usuário ID:</span>
          <span className="text-sm font-medium text-gray-700">{userId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Total de Produtos:</span>
          <span className="text-sm font-medium text-blue-600">
            {total_products}
          </span>
        </div>
      </div>
    </div>
  );
};
