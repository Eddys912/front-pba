import { useEffect, useState } from 'react';
import { PiX } from 'react-icons/pi';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  status: string;
}

interface ModalAddEmployeeProps {
  onClose: () => void;
  employee?: Employee;
  readOnly?: boolean;
  onDeleteConfirm?: () => void;
  isDeleteMode?: boolean;
  onUpdate?: () => void;
}

export const ModalAddEmployee = ({
  onClose,
  employee,
  readOnly = false,
  onDeleteConfirm,
  isDeleteMode = false,
  onUpdate,
}: ModalAddEmployeeProps) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    birth_date: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    address: '',
    status: '',
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (employee) {
      const [day, month, year] = employee.birth_date.split('/');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}`;
      setForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        middle_name: employee.middle_name,
        birth_date: formattedDate,
        email: employee.email,
        password: employee.password,
        role: employee.role,
        phone: employee.phone,
        address: employee.address,
        status: employee.status,
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
  }, [employee, onClose]);

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
      first_name,
      last_name,
      birth_date,
      email,
      password,
      role,
      phone,
      address,
      status,
    } = form;
    if (
      !first_name ||
      !last_name ||
      !birth_date ||
      !email ||
      (!employee && !password) ||
      !role ||
      !phone ||
      !address ||
      !status
    ) {
      setError('Faltan campos por llenar');
      return;
    }

    try {
      const method = employee ? 'PUT' : 'POST';
      const url = employee
        ? `${import.meta.env.VITE_API_URL}/api/users/${employee.id}`
        : `${import.meta.env.VITE_API_URL}/api/users/employee`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar el empleado');
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
              ¿Eliminar empleado?
            </h2>
            <p className="mb-6 text-gray-600">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas
              eliminar <strong>{employee?.first_name}</strong>?
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
                className="cursor-pointer  px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirmar Eliminación
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {readOnly
                ? 'Detalles del Empleado'
                : employee
                ? 'Editar Empleado'
                : 'Agregar Empleado'}
            </h2>

            {error && (
              <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Nombre(s) del empleado"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Apellido paterno del empleado"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="middle_name"
                value={form.middle_name}
                onChange={handleChange}
                placeholder="Apellido materno del empleado"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              {!employee && (
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full p-3 border border-gray-300 rounded"
                  disabled={readOnly}
                />
              )}
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              >
                <option value="">Todos los Roles</option>
                <option value="Administrador">Administrador</option>
                <option value="Gestor de usuarios">Gestor de usuarios</option>
                <option value="Gestor de alimentos">Gestor de alimentos</option>
                <option value="Gestor de empleados">Gestor de empleados</option>
              </select>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="722 123 1234"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={readOnly}
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dirección"
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
                <option value="Activo">Activo</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              {!readOnly && (
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
                >
                  {employee ? 'Actualizar' : 'Guardar Empleado'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
