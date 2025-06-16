import { User as UserIcon } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import {
  Dropdown,
  DropdownItem,
} from '../../../shared/components/DropdownMenu';

export const DashboardHeader = ({
  user,
  onLogout,
}: {
  user: { email: string; username: string };
  onLogout: () => void;
}) => {
  console.log('DashboardHeader rendered with user:', user);
  return (
    <header className="sticky top-0 z-10  bg-white shadow-sm">
      <div className="w-full flex flex-row items-center justify-between px-4 py-2">
        <a href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">TaskManager</span>
        </a>
        <div className="flex items-center gap-4">
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer"
              >
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Button>
            }
          >
            <div className="py-2 ">
              <div className="px-4 py-1 text-xs text-gray-500 font-semibold">
                Mi cuenta
              </div>
              <DropdownItem disabled>
                <div
                  className="
                  text-sm text-gray-700 font-medium truncate"
                >
                  {user.email}
                </div>
              </DropdownItem>

              <DropdownItem onClick={onLogout}>Cerrar sesión</DropdownItem>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
