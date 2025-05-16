import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';

export const AdminHeader = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
    email: string;
  } | null>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const base64 = token.split('.')[1];
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        setUserData({
          name: payload.name,
          role: payload.role,
          email: payload.email,
        });
      } catch (error) {
        console.error('Error al decodificar token:', error);
        setUserData(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const isAdmin = userData?.role === 'Administrador';
  const canAccessUsers = isAdmin || userData?.role === 'Gestor de usuarios';
  const canAccessProducts = isAdmin || userData?.role === 'Gestor de alimentos';
  const canAccessEmployees =
    isAdmin || userData?.role === 'Gestor de empleados';

  return (
    <header className="bg-white text-teal-700 p-4 shadow-md w-full fixed top-0 left-0 z-30">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/admin" className="hover:text-teal-900 transition">
            Manos Que Alimentan
          </Link>
        </h1>

        <nav className="hidden md:flex space-x-4">
          <Link
            to="/admin"
            className="px-4 py-2 rounded-xl hover:bg-teal-700 hover:text-white transition"
          >
            Inicio
          </Link>
          {(isAdmin || canAccessProducts) && (
            <Link
              to="/admin/products"
              className="px-4 py-2 rounded-xl hover:bg-teal-700 hover:text-white transition"
            >
              Inventario
            </Link>
          )}
          {(isAdmin || canAccessUsers) && (
            <Link
              to="/admin/clients"
              className="px-4 py-2 rounded-xl hover:bg-teal-700 hover:text-white transition"
            >
              Clientes
            </Link>
          )}
          {(isAdmin || canAccessEmployees) && (
            <Link
              to="/admin/employees"
              className="px-4 py-2 rounded-xl hover:bg-teal-700 hover:text-white transition"
            >
              Empleados
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="true"
              aria-label="Menú de perfil"
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border-2 border-teal-500 hover:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
            >
              <div className="relative w-full h-full overflow-hidden rounded-full bg-teal-50">
                <FiUser className="w-6 h-6 text-teal-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </button>

            <div
              className={`absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-3 z-50 transition-all duration-200 ${
                isProfileMenuOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 invisible'
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="flex items-start space-x-3 p-2 border-b border-gray-200 mb-2">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-teal-700" />
                </div>
                <div className="flex-grow pt-1">
                  <p className="font-medium text-gray-800">
                    {userData?.name || 'Desconocido'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || 'email@ejemplo.com'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-teal-50 transition-colors duration-150 focus:outline-none focus:bg-teal-50"
                  role="menuitem"
                >
                  <FiSettings className="w-4 h-4 mr-3 text-teal-600" />
                  <span>Configuración</span>
                </button>

                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-teal-50 transition-colors duration-150 focus:outline-none focus:bg-teal-50"
                  role="menuitem"
                >
                  <FiHelpCircle className="w-4 h-4 mr-3 text-teal-600" />
                  <span>Soporte</span>
                </button>

                <div className="pt-1 mt-1 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 mt-1 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-150 focus:outline-none focus:bg-red-50"
                    role="menuitem"
                  >
                    <FiLogOut className="w-4 h-4 mr-3" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed left-0 right-0 top-16 bg-white text-teal-700 shadow-xl z-40 md:hidden">
          <nav className="flex flex-col space-y-2 p-4 max-w-[1400px] mx-auto">
            <Link
              to="/admin"
              className="px-4 py-3 rounded-xl hover:bg-teal-700 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            {(isAdmin || canAccessProducts) && (
              <Link
                to="/admin/products"
                className="px-4 py-3 rounded-xl hover:bg-teal-700 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inventario
              </Link>
            )}
            {(isAdmin || canAccessUsers) && (
              <Link
                to="/admin/users"
                className="px-4 py-3 rounded-xl hover:bg-teal-700 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Usuarios
              </Link>
            )}
            {(isAdmin || canAccessEmployees) && (
              <Link
                to="/admin/employees"
                className="px-4 py-3 rounded-xl hover:bg-teal-700 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Empleados
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
