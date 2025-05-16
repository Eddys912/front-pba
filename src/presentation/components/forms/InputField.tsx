import React from 'react';
import { ErrorCircle } from '../icons/ErrorCircle';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error = '',
  type = 'text',
  placeholder = '',
  icon,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && '*'}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`block w-full py-2 ${
            icon ? 'pl-10' : 'pl-3'
          } pr-10 sm:text-sm border ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
          } rounded-md focus:outline-none focus:ring-1`}
          placeholder={placeholder}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ErrorCircle />
          </div>
        )}
      </div>
      <div className="h-5 mt-1">
        {error && (
          <p className="text-red-500 text-xs flex items-center">{error}</p>
        )}
      </div>
    </div>
  );
};
