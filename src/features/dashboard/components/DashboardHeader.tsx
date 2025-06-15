import { Button } from "../../../shared/components/Button";
import {
  Dropdown,
  DropdownItem,
} from "../../../shared/components/DropdownMenu";
import { User as UserIcon } from "lucide-react";

export const DashboardHeader = ({
  user,
  onLogout,
}: {
  user: { email: string };
  onLogout: () => void;
}) => {
  return (
    <header className="sticky top-0 z-10  bg-white shadow-sm">
      <div className="w-full flex flex-row items-center justify-between px-4 py-2">
        <a href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">TaskManager</span>
        </a>
        <div className="flex items-center gap-4">
          <Dropdown
            trigger={
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Button>
            }
          >
            <div className="py-2">
              <div className="px-4 py-1 text-xs text-gray-500 font-semibold">
                Mi cuenta
              </div>
              <DropdownItem disabled>{user.email}</DropdownItem>
              <DropdownItem>
                <a href="/profile">Perfil</a>
              </DropdownItem>
              <DropdownItem>
                <a href="/settings">Configuración</a>
              </DropdownItem>

              <DropdownItem onClick={onLogout}>Cerrar sesión</DropdownItem>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
