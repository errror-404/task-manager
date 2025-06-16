import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

// --- Card container ---
interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'shadow';
}

const CardRoot: React.FC<CardRootProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: 'bg-white border border-gray-300',
    shadow: 'bg-white shadow-md',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-4 transition-shadow',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Card.Header ---
const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('mb-2 text-lg font-semibold text-gray-800', className)}>
    {children}
  </div>
);

// --- Card.Body ---
const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('text-sm text-gray-700', className)}>{children}</div>;

// --- Card.Footer ---
const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('mt-4', className)}>{children}</div>;

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
