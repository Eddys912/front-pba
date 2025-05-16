import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from '../../common/Container';

export const AdminFooter = () => {
  return (
    <footer className="mt-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 py-4">
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Información de la empresa */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-teal-700">
              Manos que Alimenta
            </h2>
            <p className="text-gray-300 text-sm">
              Plataforma solidaria que ayuda a la comunidad donando alimentos,
              reduciendo el desperdicio de estos.
            </p>
          </div>

          {/* Navegacion */}
          <nav aria-label="Navegación del sitio">
            <h3 className="font-semibold mb-4 text-teal-700">Navegación</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>
                <Link to="/admin" className="hover:text-white ">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/admin/products" className="hover:text-white">
                  Inventario
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="hover:text-white">
                  Recursos Humanos
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <address className="not-italic">
            <h3 className="font-semibold mb-4 text-teal-700">Contacto</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <MdEmail />
                mqa@manosquealimentan.org
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MdPhone />
                +55 011 1234 5678
              </li>
              <li className="flex space-x-4 pt-1 text-gray-300">
                <Link
                  to="https://facebook.com/manosquealimentan"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to="https://instagram.com/manosquealimentan"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://linkedin.com/company/manosquealimentan"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  to="https://github.com/Eddys912/manos-que-alimentan-desk.git"
                  aria-label="Github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FaGithub />
                </Link>
              </li>
            </ul>
          </address>
        </section>
        <section className="border-t border-teal-700 mt-4 pt-4 text-center text-gray-400">
          <small>
            &copy; 2025 Manos que Alimentan. Todos los derechos reservados.
            <br />
          </small>
        </section>
      </Container>
    </footer>
  );
};
