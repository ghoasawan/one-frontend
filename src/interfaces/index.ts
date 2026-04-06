export interface SignupValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ForgotPasswordValues {
  email: string;
}

export interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  icon: React.ReactNode;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}
