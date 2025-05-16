import { useState } from 'react';
import { FiLock, FiEyeOff, FiEye } from 'react-icons/fi';
import { ErrorCircle } from '../icons/ErrorCircle';

interface InputPasswordProps {
  password: string;
  setPassword: (password: string) => void;
  error?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  password,
  setPassword,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Contraseña *
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="h-5 w-5 text-gray-400" />
        </div>

        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`block w-full py-2 pl-10 pr-10 sm:text-sm border ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
          } rounded-md focus:outline-none focus:ring-1`}
          placeholder="Ingresa tu contraseña"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <FiEye className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {error && (
          <div className="absolute inset-y-0 right-9 pr-3 flex items-center pointer-events-none">
            <ErrorCircle />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};
