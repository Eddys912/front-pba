import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../shared/api/productApi';
import { IProduct } from '../../../shared/interfaces/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (!data || Object.keys(data).length === 0) {
          setProducts([]);
        } else {
          setProducts(Object.values(data));
        }
      } catch (err) {
        console.error(err);
        setErrors(
          'Hubo un error al cargar los productos. Verifica tu conexión.'
        );
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return { products, loading, errors };
};
