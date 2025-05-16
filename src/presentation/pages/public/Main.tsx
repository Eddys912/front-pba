import { useEffect, useState, useCallback } from 'react';
import { ProductCard } from '../../components/common/ProductCard';
import { IProduct } from '../../../shared/interfaces/Product';
import { Container } from '../../components/common/Container';
import { ProductsFilter } from '../../components/layouts/Public/ProductsFilter';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CartProducts } from '../../components/modals/CartProducts';

export const Main: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search') || '';
  const isAuthenticated = !!sessionStorage.getItem('token');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(
        searchQuery
          ? `${
              import.meta.env.VITE_API_URL
            }/api/foods/filter?name=${encodeURIComponent(searchQuery)}`
          : `${import.meta.env.VITE_API_URL}/api/foods/all`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const fetchFilteredProducts = async (category: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const url = category
        ? `${
            import.meta.env.VITE_API_URL
          }/api/foods/filter?category=${encodeURIComponent(category)}`
        : `${import.meta.env.VITE_API_URL}/api/foods/all`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la petición');

      const data = await response.json();
      setProducts(data.length ? data : []);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al cargar los productos. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchFilteredProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const handleOpenCart = () => setShowCart(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  const handleAddToCart = (product: IProduct) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para apartar productos.');
      navigate('/auth/login');
      return;
    }

    if (cart.find((p) => p.id === product.id)) {
      alert('Este producto ya está en tu carrito.');
      return;
    }

    if (cart.length >= 3) {
      alert('Solo puedes apartar un máximo de 3 productos.');
      return;
    }

    setCart((prev) => [...prev, product]);
  };

  const confirmDonation = async () => {
    try {
      for (const product of cart) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/foods/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: product.quantity - 1,
          }),
        });
      }
      setCart([]);
      setShowCart(false);
      alert('Donación confirmada. Gracias por tu apoyo.');
      fetchFilteredProducts(selectedCategory);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al procesar la donación.');
    }
  };

  return (
    <Container>
      <h2 className="text-2xl font-extrabold mb-4">Productos Disponibles</h2>

      <ProductsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

      {loading && (
        <p className="text-center text-gray-600 text-lg">
          Cargando productos...
        </p>
      )}

      {!loading && error && (
        <div className="text-center text-red-600 text-lg py-10">{error}</div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-10">
          No hay productos para donar actualmente.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onReserve={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}

      {showCart && (
        <CartProducts
          cart={cart}
          onClose={() => setShowCart(false)}
          onConfirm={confirmDonation}
        />
      )}
    </Container>
  );
};
