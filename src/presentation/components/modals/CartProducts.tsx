import { IProduct } from '../../../shared/interfaces/Product';
import { PiX } from 'react-icons/pi';

interface CartProductsProps {
  cart: IProduct[];
  onClose: () => void;
  onConfirm: () => void;
}

export const CartProducts: React.FC<CartProductsProps> = ({
  cart,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex justify-center items-center">
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
        id="cart-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          <PiX size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Carrito de Productos Apartados
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay productos en el carrito.
          </p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((product) => (
              <li
                key={product.id}
                className="border border-gray-200 p-3 rounded flex items-center gap-4"
              >
                <img
                  src={product.image}
                  alt={product.food_name}
                  className="w-12 h-12 object-contain rounded border"
                />
                <div>
                  <p className="font-semibold text-gray-700">
                    {product.food_name}
                  </p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={cart.length === 0}
          >
            Confirmar Donación
          </button>
        </div>
      </div>
    </div>
  );
};
