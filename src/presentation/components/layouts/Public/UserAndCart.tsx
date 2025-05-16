import { Link } from 'react-router-dom';
import { FaCartShopping, FaUserLarge } from 'react-icons/fa6';

export const UserAndCartIcons = () => {
  return (
    <>
      <button
        className="cursor-pointer relative text-gray-700 hover:text-teal-700 mr-8"
        aria-label="Abrir carrito"
        onClick={() => {
          const event = new CustomEvent('open-cart');
          window.dispatchEvent(event);
        }}
      >
        <FaCartShopping size={22} />
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          0
        </span>
      </button>

      <Link
        to="/auth/login"
        className="text-gray-700 hover:text-teal-700"
        aria-label="Mi cuenta"
      >
        <FaUserLarge size={22} />
      </Link>
    </>
  );
};
