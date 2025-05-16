import {
  PiMagnifyingGlass,
  PiPlus,
  PiEye,
  PiPencil,
  PiTrash,
  PiCaretLeft,
  PiCaretRight,
  PiUsers,
  PiUserPlus,
  PiCheckCircle,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { IUser } from '../../../shared/interfaces/User';
import { ModalAddClient } from '../../components/modals/AddClient';

export const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<
    'view' | 'edit' | 'delete' | 'create' | null
  >(null);
  const [clients, setClients] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  // Cálculo de productos paginados
  const indexOfLastProduct = currentPage * clientsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const closeModal = () => {
    setSelectedClient(null);
    setModalMode(null);
  };

  const handleView = (client: IUser) => {
    setSelectedClient(client);
    setModalMode('view');
  };

  const handleEdit = (client: IUser) => {
    setSelectedClient(client);
    setModalMode('edit');
  };

  const handleDelete = (client: IUser) => {
    setSelectedClient(client);
    setModalMode('delete');
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/clients/all');
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleFilter = async () => {
    try {
      let query = '';
      if (search)
        query += `${query ? '&' : ''}name=${encodeURIComponent(search)}`;
      if (status && status !== 'Todos los estatus')
        query += `${query ? '&' : ''}status=${encodeURIComponent(
          status.toLowerCase()
        )}`;

      const url = query
        ? `http://localhost:3000/api/users/filter?${query}`
        : `http://localhost:3000/api/users/clients/all`;

      const res = await fetch(url);
      const data = await res.json();

      // Validar que la respuesta sea un arreglo
      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients([]); // Vaciar productos si no es un array válido
        console.warn('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error('Error filtering clientes:', error);
      setClients([]); // Prevenir el error de .map
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <main className="mt-24 p-4 md:p-8 max-w-[1400px] mx-auto w-full flex-1">
      {/* Dashboard Header con estadísticas de RRHH */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-4 md:mb-0">
          <PiUsers /> Gestión de Clientes
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-green-500">
            <div className="bg-green-100 p-2 rounded-full">
              <PiUserPlus />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Clientes</p>
              <p className="text-xl font-bold">{clients.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Barra de búsqueda y filtros */}
      <section className="flex flex-col md:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center flex-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <PiMagnifyingGlass className="ml-4 text-gray-600" />
          <input
            type="search"
            placeholder="Buscar cliente..."
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onClick={handleFilter}
            className="p-3 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Todos los estatus">Todos los estatus</option>
            <option>Activo</option>
            <option>Bloqueado</option>
            <option>Inactivo</option>
          </select>
          <button
            onClick={() => setModalMode('create')}
            className="cursor-pointer bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 shadow-md"
          >
            <PiPlus /> Agregar Cliente
          </button>
        </div>
      </section>

      {/* Tabla de Inventario */}
      <section className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <PiUsers /> Registro de Clientes
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {['Nombre', 'Fecha Ingreso', 'Estado', 'Acciones'].map(
                (heading) => (
                  <th
                    key={heading}
                    className="p-4 bg-gray-50 border-b-2 border-gray-200 text-gray-700 font-semibold"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client: IUser) => (
              <tr
                key={client.id}
                className="border-b border-b-gray-200 hover:bg-blue-50 transition duration-150"
              >
                <td className="p-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-bold text-blue-800">
                      {client.first_name[0]}
                      {client.last_name[0]}
                    </span>
                  </div>
                  {client.first_name} {client.last_name} {client.middle_name}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <span className="font-medium">{client.birth_date}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
                      <PiCheckCircle /> {client.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(client)}
                      className="cursor-pointer text-teal-600 hover:text-teal-800 bg-teal-100 p-2 rounded transition duration-150"
                    >
                      <PiEye />
                    </button>
                    <button
                      onClick={() => handleEdit(client)}
                      className="cursor-pointer text-yellow-600 hover:text-yellow-800 bg-yellow-100 p-2 rounded transition duration-150"
                    >
                      <PiPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(client)}
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
              {Math.min(indexOfLastProduct, clients.length)}
            </span>{' '}
            de <span className="font-medium">{clients.length}</span> clientes
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
        <ModalAddClient
          onClose={closeModal}
          client={modalMode !== 'create' ? selectedClient! : undefined}
          readOnly={modalMode === 'view'}
          isDeleteMode={modalMode === 'delete'}
          onDeleteConfirm={async () => {
            try {
              await fetch(
                `http://localhost:3000/api/users/${selectedClient!.id}`,
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
