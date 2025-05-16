import { useEffect, useState } from 'react';
import { PiX } from 'react-icons/pi';

interface Product {
  id: string;
  food_name: string;
  category: string;
  expiration_date: string;
  quantity: number;
  status: string;
  image: string;
}

interface ModalAddProductProps {
  onClose: () => void;
  product?: Product;
  readOnly?: boolean;
  onDeleteConfirm?: () => void;
  isDeleteMode?: boolean;
  onUpdate?: () => void;
}

export const ModalAddProduct = ({
  onClose,
  product,
  readOnly = false,
  onDeleteConfirm,
  isDeleteMode = false,
  onUpdate,
}: ModalAddProductProps) => {
  const [form, setForm] = useState({
    food_name: '',
    category: '',
    expiration_date: '',
    quantity: '',
    status: '',
    image_url: '',
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (product) {
      const [day, month, year] = product.expiration_date.split('/');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}`;
      setForm({
        food_name: product.food_name,
        category: product.category,
        expiration_date: formattedDate,
        quantity: String(product.quantity),
        image_url: product.image,
        status: product.status,
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const modalContent = document.getElementById('modal-content');
      if (modalContent && !modalContent.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [product, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;

    const {
      food_name,
      category,
      expiration_date,
      quantity,
      image_url,
      status,
    } = form;
    if (
      !food_name ||
      !category ||
      !expiration_date ||
      !quantity ||
      !image_url ||
      !status
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const method = product ? 'PUT' : 'POST';
      const url = product
        ? `${import.meta.env.VITE_API_URL}/api/foods/${product.id}`
        : `${import.meta.env.VITE_API_URL}/api/foods`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: parseInt(quantity),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar el producto');
      }
      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error inesperado';
      setError(errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        id="modal-content"
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-red-600"
        >
          <PiX size={24} />
        </button>

        {isDeleteMode ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ¿Eliminar producto?
            </h2>
            <p className="mb-6 text-gray-600">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas
              eliminar <strong>{product?.food_name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="cursor-pointer  px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={onDeleteConfirm}
                className="cursor-pointer px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirmar Eliminación
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {readOnly
                ? 'Detalles del Producto'
                : product
                ? 'Editar Producto'
                : 'Agregar Producto'}
            </h2>

            {error && (
              <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {readOnly && form.image_url && (
                <img
                  src={form.image_url}
                  alt="Producto"
                  className="w-full h-48 object-contain rounded border"
                />
              )}

              <input
                name="food_name"
                value={form.food_name}
                onChange={handleChange}
                placeholder="Nombre del producto"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              >
                <option value="">Selecciona categoría</option>
                <option value="Semillas">Semillas</option>
                <option value="Enlatados">Enlatados</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Verduras">Verduras</option>
                <option value="Frutas">Frutas</option>
                <option value="Proteínas">Proteínas</option>
              </select>
              <input
                name="expiration_date"
                value={form.expiration_date}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="number"
                placeholder="Cantidad"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              >
                <option value="">Selecciona estatus</option>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
                <option value="Descontinuado">Descontinuado</option>
              </select>
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="URL de la imagen"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />

              {!readOnly && (
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
                >
                  {product ? 'Actualizar' : 'Guardar Producto'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
