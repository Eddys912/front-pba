import {
  PiPackage,
  PiWarning,
  PiXCircle,
  PiMagnifyingGlass,
  PiPlus,
  PiBed,
  PiCheckCircle,
  PiEye,
  PiPencil,
  PiTrash,
  PiCaretLeft,
  PiCaretRight,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { IProduct } from '../../../shared/interfaces/Product';
import { ModalAddProduct } from '../../components/modals/AddProduct';

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalMode, setModalMode] = useState<
    'view' | 'edit' | 'delete' | 'create' | null
  >(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Cálculo de productos paginados
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products)
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const totalPages = Math.ceil(products.length / productsPerPage);

  const closeModal = () => {
    setSelectedProduct(null);
    setModalMode(null);
  };

  const handleView = (product: IProduct) => {
    setSelectedProduct(product);
    setModalMode('view');
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setModalMode('edit');
  };

  const handleDelete = (product: IProduct) => {
    setSelectedProduct(product);
    setModalMode('delete');
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/foods/all`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleFilter = async () => {
    try {
      let query = '';
      if (search)
        query += `${query ? '&' : ''}name=${encodeURIComponent(search)}`;
      if (category && category !== 'Todas las categorías')
        query += `${query ? '&' : ''}category=${encodeURIComponent(category)}`;
      if (status && status !== 'Todos los estatus')
        query += `${query ? '&' : ''}status=${encodeURIComponent(
          status.toLowerCase()
        )}`;

      const url = query
        ? `${import.meta.env.VITE_API_URL}/api/foods/filter?${query}`
        : `${import.meta.env.VITE_API_URL}/api/foods/all`;

      const res = await fetch(url);
      const data = await res.json();

      // Validar que la respuesta sea un arreglo
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]); // Vaciar productos si no es un array válido
        console.warn('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      setProducts([]); // Prevenir el error de .map
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="mt-24 p-4 md:p-8 max-w-[1400px] mx-auto w-full flex-1">
      {/* Dashboard Header con estadísticas */}
      <section className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-4 md:mb-0">
          <PiPackage className="text-blue-600" /> Gestión de Inventario
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-2 rounded-full">
              <PiPackage className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Productos</p>
              <p className="text-xl font-bold">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-yellow-500">
            <div className="bg-yellow-100 p-2 rounded-full">
              <PiWarning className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bajo Stock</p>
              <p className="text-xl font-bold">8</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-red-500">
            <div className="bg-red-100 p-2 rounded-full">
              <PiXCircle className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Agotados</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de búsqueda y filtros */}
      <section className="flex flex-col md:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center flex-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <PiMagnifyingGlass className="ml-4 text-gray-600" />
          <input
            type="search"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleFilter();
              }
            }}
            className="p-4 w-full outline-none border-0"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onClick={handleFilter}
            className="p-3 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas las categorías">Todas las categorías</option>
            <option>Semillas</option>
            <option>Enlatados</option>
            <option>Lácteos</option>
            <option>Verduras</option>
            <option>Frutas</option>
            <option>Proteínas</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onClick={handleFilter}
            className="p-3 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos los estatus">Todos los estatus</option>
            <option>Disponible</option>
            <option>Descontinuado</option>
            <option>Agotado</option>
          </select>
          <button
            onClick={() => setModalMode('create')}
            className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 shadow-md"
          >
            <PiPlus /> Agregar Producto
          </button>
        </div>
      </section>

      {/* Tabla de Inventario */}
      <section className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <PiPackage className="text-blue-600" /> Registro de Inventario
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {[
                'Nombre',
                'Fecha de expiración',
                'Cantidad',
                'Categoría',
                'Estado',
                'Acciones',
              ].map((heading) => (
                <th
                  key={heading}
                  className="p-4 bg-gray-50 border-b-2 border-gray-200 text-gray-700 font-semibold"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product: IProduct) => (
              <tr
                key={product.id}
                className="border-b border-b-gray-200 hover:bg-blue-50 transition duration-150"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <PiBed className="text-blue-600" />
                    </div>
                    <span className="font-medium">{product.food_name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <span className="font-medium">
                      {product.expiration_date}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium">{product.quantity}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-2/3 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
                      <PiCheckCircle /> {product.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(product)}
                      className="cursor-pointer text-teal-600 hover:text-teal-800 bg-teal-100 p-2 rounded transition duration-150"
                    >
                      <PiEye />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 bg-blue-100 p-2 rounded transition duration-150"
                    >
                      <PiPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="cursor-pointer text-red-600 hover:text-red-800 bg-red-100 p-2 rounded transition duration-150"
                    >
                      <PiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-6 px-4">
          <div className="text-sm text-gray-500">
            Mostrando{' '}
            <span className="font-medium">
              {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, products.length)}
            </span>{' '}
            de <span className="font-medium">{products.length}</span> productos
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-400 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <PiCaretLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border border-gray-400 ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-400 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <PiCaretRight />
            </button>
          </div>
        </div>
      </section>
      {modalMode && (
        <ModalAddProduct
          onClose={closeModal}
          product={modalMode !== 'create' ? selectedProduct! : undefined}
          readOnly={modalMode === 'view'}
          isDeleteMode={modalMode === 'delete'}
          onDeleteConfirm={async () => {
            try {
              await fetch(
                `${import.meta.env.VITE_API_URL}/api/foods/${
                  selectedProduct!.id
                }`,
                {
                  method: 'DELETE',
                }
              );
              closeModal();
              fetchProducts();
              // volver a cargar productos si es necesario
            } catch (err) {
              console.error('Error al eliminar:', err);
            }
          }}
        />
      )}
    </main>
  );
};
