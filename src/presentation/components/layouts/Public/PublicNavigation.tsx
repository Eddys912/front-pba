import { FaSearch } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../../common/Container';
import { UserAndCartIcons } from './UserAndCart';
import { useState } from 'react';

export const PublicNavigation = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed.length > 0) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/'); // 🔁 Redirige a raíz si está vacío
    }
  };

  return (
    <header className="shadow mb-4 fixed w-full top-0 bg-zinc-50 z-50">
      <Container>
        <nav
          className="flex flex-col md:flex-row px-4 items-center justify-between py-3 gap-3"
          aria-label="Navegación"
        >
          {/* Logo */}
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-teal-700 whitespace-nowrap">
                Manos que Alimentan
              </h1>
            </Link>

            {/* Mobile menu icons (hidden on desktop) */}
            <div className="flex md:hidden items-center space-x-4">
              <UserAndCartIcons />
            </div>
          </div>

          {/* Search Bar - now full width on mobile */}
          <div className="w-full md:flex-grow md:mx-4 max-w-2xl">
            <form
              role="search"
              onSubmit={handleSearch}
              className="px-3 py-2 flex justify-center items-center border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 w-full"
            >
              <label htmlFor="product-search" className="sr-only">
                Buscar productos de donación
              </label>
              <FaSearch className="ml-2" />
              <input
                id="product-search"
                type="search"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca productos"
                className="w-full py-2 px-4 outline-none"
                aria-describedby="search-hint"
              />
            </form>
          </div>

          {/* Desktop menu icons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <UserAndCartIcons />
          </div>
        </nav>
      </Container>
    </header>
  );
};
