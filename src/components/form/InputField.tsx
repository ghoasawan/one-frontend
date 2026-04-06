"use client";

import React, { useState } from "react";
import { Field, FieldProps } from "formik";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  icon: React.ReactNode;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}

export function InputField({
  label,
  name,
  type = "text",
  icon,
  placeholder,
  error,
  touched,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const hasError = touched && error;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-xs font-medium text-zinc-300"
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500"
          onClick={() => {
            const input = document.getElementById(name);
            input?.focus();
          }}
        >
          {icon}
        </div>
        <Field name={name}>
          {({ field }: FieldProps) => (
            <input
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              className={`w-full cursor-pointer rounded-lg border bg-zinc-800/50 py-2 pl-9 pr-${isPassword ? "9" : "3"} text-sm text-zinc-100 placeholder-zinc-500 transition-colors outline-none focus:ring-1 focus:ring-zinc-500 ${
                hasError
                  ? "border-red-500/50"
                  : "border-zinc-700 hover:border-zinc-600"
              }`}
            />
          )}
        </Field>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-6
             text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hasError && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
