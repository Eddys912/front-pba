const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/foods/all';

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/foods/all`);
    if (res.status !== 200) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return null;
  }
};
