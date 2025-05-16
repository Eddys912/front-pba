// Definición de la interfaz del formulario
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

// Datos iniciales del formulario
export const initialFormData: RegisterFormData = {
  firstName: '',
  lastName: '',
  middleName: '',
  birthDate: '',
  email: '',
  password: '',
  phone: '',
  address: '',
};

// Configuración de validación por campo
export const registerValidationRules: ValidationRules<RegisterFormData> = {
  firstName: { required: true, message: 'El nombre es obligatorio' },
  lastName: { required: true, message: 'El apellido paterno es obligatorio' },
  birthDate: {
    required: true,
    message: 'La fecha de nacimiento es obligatoria',
  },
  email: {
    required: true,
    message: 'El correo electrónico es obligatorio',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Formato de correo electrónico inválido',
    },
  },
  password: {
    required: true,
    message: 'La contraseña es obligatoria',
    minLength: {
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  },
  address: { required: true, message: 'La dirección es obligatoria' },
};

// Campos por paso
export const step1Fields: Array<keyof RegisterFormData> = [
  'firstName',
  'lastName',
  'middleName',
  'birthDate',
];
export const step2Fields: Array<keyof RegisterFormData> = [
  'email',
  'password',
  'phone',
  'address',
];

// src/services/validationService.ts
export type ValidationRule = {
  required?: boolean;
  message: string;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
};

export type ValidationRules<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule;
};

// Función para validar un campo individual
export const validateField = <T extends Record<string, any>>(
  field: keyof T,
  value: string,
  rules: ValidationRules<T>
): string => {
  const fieldRules = rules[field];

  if (!fieldRules) return '';

  if (fieldRules.required && !value.trim()) {
    return fieldRules.message;
  }

  if (fieldRules.pattern && !fieldRules.pattern.value.test(value)) {
    return fieldRules.pattern.message;
  }

  if (fieldRules.minLength && value.length < fieldRules.minLength.value) {
    return fieldRules.minLength.message;
  }

  return '';
};

// Función para validar múltiples campos
export const validateFields = <T extends Record<string, any>>(
  data: T,
  fields: Array<keyof T>,
  rules: ValidationRules<T>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  fields.forEach((field) => {
    const errorMessage = validateField(field, data[field] as string, rules);
    if (errorMessage) {
      errors[field as string] = errorMessage;
    }
  });

  return errors;
};
