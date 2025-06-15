import { Search } from "lucide-react";

export const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative w-full max-w-xs">
    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
    <input
      type="text"
      className="pl-9 pr-3 py-2 rounded border border-gray-300 w-full text-sm "
      placeholder="Buscar tarea..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
