import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpinerCircle } from '../../components/icons/SpinerCircle';
import { InputPassword } from '../../components/forms/InputPassword';
import { InputField } from '../../components/forms/InputField';
import { FiMail } from 'react-icons/fi';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const requiredFields = ['email', 'password'];
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (fields: string[]) => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm(requiredFields);

    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }

      const token = data.token;
      sessionStorage.setItem('token', token);

      // Decodificar token (asumiendo formato JWT: header.payload.signature)
      const payloadBase64 = token.split('.')[1];
      const payloadJson = JSON.parse(atob(payloadBase64));
      const role = payloadJson.role;

      // Redireccionar según rol
      if (role && role !== 'Usuario') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.message || 'Error al conectar con el servidor';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full bg-white max-w-5xl rounded-2xl shadow-2xl md:flex-row">
      {/* Imagen de la empresa */}
      <header className="md:w-1/2 relative bg-teal-50">
        <img
          src="/logo-mqa.svg"
          alt="Manos que Alimentan"
          className="w-full h-full object-cover"
        />
        <footer className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl font-bold mb-2">
            Manos que Alimentan
          </h1>
          <p className="text-white/90 text-sm">
            Plataforma de gestión para la donación y distribución de alimentos.
          </p>
        </footer>
      </header>

      {/* Formulario de inicio de sesión */}
      <main className="md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 text-center">
          Bienvenido
        </h2>
        {errors.general && (
          <p className="text-red-600 text-sm text-center mt-2">
            {errors.general}
          </p>
        )}

        <form id="login-form" onSubmit={handleLogin}>
          <InputField
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<FiMail className="h-5 w-5 text-gray-400" />}
            placeholder="correo@ejemplo.com"
            type="email"
            required
          />
          <InputPassword
            password={formData.password}
            setPassword={(value) => handleChange('password', value)}
            error={errors.password}
          />
          <button className="my-4 cursor-pointer w-full text-right text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200">
            ¿Olvidaste tu contraseña?
          </button>
          {/* Botón de Inicio de Sesión */}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200 flex justify-center items-center shadow-md hover:shadow-lg"
          >
            {isLoading ? <SpinerCircle /> : 'Iniciar sesión'}
          </button>

          {/* Enlace para Registro */}
          <footer className="pt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a
                href="/auth/register"
                className="font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200"
              >
                Regístrate aquí
              </a>
            </p>
          </footer>
        </form>
      </main>
    </section>
  );
};
