import React, { useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiArrowLeft,
  FiArrowRight,
  FiMail,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { SpinerCircle } from '../../components/icons/SpinerCircle';
import { InputPassword } from '../../components/forms/InputPassword';
import { InputField } from '../../components/forms/InputField';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    first_name: '',
    last_name: '',
    middle_name: '',
    birth_date: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const requiredFieldsStep1 = ['first_name', 'last_name', 'birth_date'];
  const requiredFieldsStep2 = ['email', 'password', 'address', 'phone'];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setGeneralError('');
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

  const nextStep = () => {
    const isValid = validateForm(requiredFieldsStep1);
    if (isValid) setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm(requiredFieldsStep2);

    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/client`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 400 || response.status === 409) {
        const errorData = await response.json();
        setGeneralError(errorData.message || 'Error al registrar');
        return;
      }

      if (!response.ok) {
        setGeneralError('Hubo un error al registrar. Intenta más tarde.');
        return;
      }

      const data = await response.json();
      console.log('Usuario registrado correctamente:', data);
      navigate('/auth/login');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setGeneralError('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full bg-white max-w-6xl rounded-2xl shadow-2xl overflow-hidden md:flex-row">
      <header className="md:w-2/5 h-40 md:h-auto relative bg-teal-50">
        <img
          src="/logo-mqa.svg"
          alt="Manos que Alimentan"
          className="w-full h-full object-contain md:object-cover"
        />
        <footer className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl font-bold mb-2">
            Manos que Alimentan
          </h1>
          <p className="text-white/90 text-sm">
            Únete a nosotros y forma parte de la comunidad
          </p>
        </footer>
      </header>

      <main className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 text-center">
          Crear Cuenta
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {step === 1 ? 'Información personal' : 'Datos de contacto'}
        </p>
        {generalError && (
          <p className="text-center text-red-600 text-sm mb-4">
            {generalError}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nombre(s)"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={errors.first_name}
                  icon={<FiUser className="h-5 w-5 text-gray-400" />}
                  placeholder="Ingresa tu nombre"
                  required
                />
                <InputField
                  label="Apellido Paterno"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={errors.last_name}
                  icon={<FiUser className="h-5 w-5 text-gray-400" />}
                  placeholder="Ingresa tu apellido paterno"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Apellido Materno"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  error={errors.middle_name}
                  icon={<FiUser className="h-5 w-5 text-gray-400" />}
                  placeholder="Apellido materno (opcional)"
                />

                <InputField
                  label="Fecha de nacimiento"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  error={errors.birth_date}
                  icon={<FiCalendar className="h-5 w-5 text-gray-400" />}
                  type="date"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className={`cursor-pointer w-full col-start-2 bg-teal-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200 ease-in-out flex justify-center items-center gap-2 shadow-md hover:bg-teal-600 hover:shadow-lg`}
                >
                  Siguiente <FiArrowRight className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-0">
                  <InputPassword
                    password={formData.password}
                    setPassword={(value) => handleChange('password', value)}
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Teléfono *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={<FiPhone className="h-5 w-5 text-gray-400" />}
                  placeholder="722 123 4567"
                  type="tel"
                />

                <InputField
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  icon={<FiMapPin className="h-5 w-5 text-gray-400" />}
                  placeholder="Ingresa tu dirección completa"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200 ease-in-out flex justify-center items-center gap-2"
                >
                  <FiArrowLeft className="h-5 w-5" /> Regresar
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer bg-teal-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition duration-200 ease-in-out flex justify-center items-center gap-2 shadow-md hover:bg-teal-600 hover:shadow-lg`}
                >
                  {isLoading ? <SpinerCircle /> : 'Registrarse'}
                </button>
              </div>
            </>
          )}

          <div className="flex justify-center mt-4 space-x-2">
            <div
              className={`h-2 w-8 rounded-full ${
                step === 1 ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`h-2 w-8 rounded-full ${
                step === 2 ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            ></div>
          </div>

          <footer className="text-center mt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <a
                href="/auth/login"
                className="font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200"
              >
                Inicia sesión aquí
              </a>
            </p>
          </footer>
        </form>
      </main>
    </section>
  );
};
