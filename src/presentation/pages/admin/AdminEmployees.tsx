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
  PiBriefcase,
  PiClock,
  PiCheckCircle,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { IUser } from '../../../shared/interfaces/User';
import { ModalAddEmployee } from '../../components/modals/AddEmployee';

export const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<
    'view' | 'edit' | 'delete' | 'create' | null
  >(null);
  const [employees, setEmployees] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // Cálculo de productos paginados
  const indexOfLastProduct = currentPage * employeesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - employeesPerPage;
  const currentEmployees = Array.isArray(employees)
    ? employees.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const closeModal = () => {
    setSelectedEmployee(null);
    setModalMode(null);
  };

  const handleView = (employee: IUser) => {
    setSelectedEmployee(employee);
    setModalMode('view');
  };

  const handleEdit = (employee: IUser) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
  };

  const handleDelete = (employee: IUser) => {
    setSelectedEmployee(employee);
    setModalMode('delete');
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/employees/all`
      );
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleFilter = async () => {
    try {
      let query = '';
      if (search)
        query += `${query ? '&' : ''}name=${encodeURIComponent(search)}`;
      if (role && role !== 'Todos los roles')
        query += `${query ? '&' : ''}role=${encodeURIComponent(role)}`;
      if (status && status !== 'Todos los estatus')
        query += `${query ? '&' : ''}status=${encodeURIComponent(
          status.toLowerCase()
        )}`;

      const url = query
        ? `${import.meta.env.VITE_API_URL}/api/users/filter?${query}`
        : `${import.meta.env.VITE_API_URL}/api/users/employees/all`;

      const res = await fetch(url);
      const data = await res.json();

      // Validar que la respuesta sea un arreglo
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        setEmployees([]); // Vaciar productos si no es un array válido
        console.warn('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error('Error filtering empleados:', error);
      setEmployees([]); // Prevenir el error de .map
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
          <PiUsers /> Gestión de Empleados
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-green-500">
            <div className="bg-green-100 p-2 rounded-full">
              <PiUserPlus />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Empleados</p>
              <p className="text-xl font-bold">{employees.length}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-2 rounded-full">
              <PiBriefcase />
            </div>
            <div>
              <p className="text-sm text-gray-500">Roles</p>
              <p className="text-xl font-bold">{role.length}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center gap-3 border-l-4 border-amber-500">
            <div className="bg-amber-100 p-2 rounded-full">
              <PiClock />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nuevas Contrataciones</p>
              <p className="text-xl font-bold">3</p>
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
            placeholder="Buscar empleado..."
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onClick={handleFilter}
            className="p-3 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Todos los roles">Todos los roles</option>
            <option>Administrador</option>
            <option>Gestor de usuarios</option>
            <option>Gestor de alimentos</option>
            <option>Gestor de empleados</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onClick={handleFilter}
            className="p-3 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Todos los estatus">Todos los estatus</option>
            <option>Activo</option>
            <option>Bloqueado</option>
            <option>Inactivo</option>
          </select>
          <button
            onClick={() => setModalMode('create')}
            className="cursor-pointer bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 shadow-md"
          >
            <PiPlus /> Agregar Empleado
          </button>
        </div>
      </section>

      {/* Tabla de Inventario */}
      <section className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <PiUsers /> Registro de Empleados
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {['Nombre', 'Cargo', 'Fecha Ingreso', 'Estado', 'Acciones'].map(
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
            {currentEmployees.map((employee: IUser) => (
              <tr
                key={employee.id}
                className="border-b border-b-gray-200 hover:bg-blue-50 transition duration-150"
              >
                <td className="p-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-bold text-blue-800">
                      {employee.first_name[0]}
                      {employee.last_name[0]}
                    </span>
                  </div>
                  {employee.first_name} {employee.last_name}{' '}
                  {employee.middle_name}
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {employee.role}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <span className="font-medium">{employee.birth_date}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
                      <PiCheckCircle /> {employee.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(employee)}
                      className="cursor-pointer text-teal-600 hover:text-teal-800 bg-teal-100 p-2 rounded transition duration-150"
                    >
                      <PiEye />
                    </button>
                    <button
                      onClick={() => handleEdit(employee)}
                      className="cursor-pointer text-yellow-600 hover:text-yellow-800 bg-yellow-100 p-2 rounded transition duration-150"
                    >
                      <PiPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(employee)}
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
              {Math.min(indexOfLastProduct, employees.length)}
            </span>{' '}
            de <span className="font-medium">{employees.length}</span> empleados
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
        <ModalAddEmployee
          onClose={closeModal}
          employee={modalMode !== 'create' ? selectedEmployee! : undefined}
          readOnly={modalMode === 'view'}
          isDeleteMode={modalMode === 'delete'}
          onDeleteConfirm={async () => {
            try {
              await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/${
                  selectedEmployee!.id
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
