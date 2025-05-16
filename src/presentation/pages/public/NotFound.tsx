import { Link } from 'react-router-dom';
import { HamburgerIcon } from '../../components/icons/HamburgerIcon';

export default function NotFound() {
  return (
    <main className="max-w-6xl w-full mx-auto px-8 overflow-hidden flex flex-col gap-8 md:flex-row">
      <section className="w-full md:w-1/2 flex items-center justify-center">
        <HamburgerIcon className="[stroke-dasharray:300] [stroke-dashoffset:300] animate-[dash_4s_alternate_infinite]" />
      </section>
      <section className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl md:text-5xl font-extrabold text-gray-800 mb-8">
          Parece que has encontrado la puerta a la gran nada.
        </h2>
        <p className="text-gray-600 mb-2">
          El contenido que buscas no existe, ha sido eliminado o has escrito mal
          el enlace.
        </p>
        <p className="text-gray-600 mb-4">
          Lo sentimos. Visita nuestra página de inicio para llegar a donde
          necesitas.
        </p>
        <Link
          to="/"
          className="w-full mt-2 sm:w-fit px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out text-center"
        >
          Ir al Inicio
        </Link>
      </section>
    </main>
  );
}
