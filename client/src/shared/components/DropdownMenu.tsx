import { useState, useRef, useEffect } from 'react';
import { cn } from '../utils/cn';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg  rounded-md z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50',
      disabled && 'cursor-not-allowed'
    )}
  >
    {children}
  </button>
);
