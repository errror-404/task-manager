import React from 'react';
import { cn } from '../utils/cn';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId =
    id || props.name || `input-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'rounded-md border px-3 py-2 text-sm shadow-sm outline-none transition-all',
          'focus:ring-2 focus:ring-blue-400 focus:border-blue-400',
          error
            ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-300',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
