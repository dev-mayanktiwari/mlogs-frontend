import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PenSquare, LogIn, Menu, User } from "lucide-react";
import { User as UserType } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "@/components/theme/ModeToggle";
import useUserStore from "../../store/userStore";
import { useState, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useLogout from "@/hooks/useLogout";

type NavbarContentProps = {
  user: UserType | null;
  isMobile?: boolean;
  closeSheet: () => void;
  onLogout: () => void;
};

export function Navbar() {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = useCallback(() => setIsOpen(false), []);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    closeSheet();
    navigate("/");
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MLOGS
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavbarContent
              user={user}
              closeSheet={closeSheet}
              onLogout={handleLogout}
            />
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <NavbarContent
                  user={user}
                  isMobile
                  closeSheet={closeSheet}
                  onLogout={handleLogout}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function NavbarContent({
  user,
  isMobile = false,
  closeSheet,
  onLogout,
}: NavbarContentProps) {
  return (
    <>
      <Link to="/guestbook" onClick={closeSheet}>
        <Button
          variant={isMobile ? "ghost" : "default"}
          className="w-full justify-start"
        >
          <PenSquare className="w-4 h-4 mr-2" />
          Guestbook
        </Button>
      </Link>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={isMobile ? "w-full justify-start" : ""}
            >
              <User className="w-5 h-5 mr-2" />
              {user.name || "User Menu"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isMobile ? "center" : "end"}>
            <DropdownMenuItem asChild>
              <Link
                to="/profile/me"
                onClick={closeSheet}
                className="cursor-pointer"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to="/login"
          className={isMobile ? "w-full" : ""}
          onClick={closeSheet}
        >
          <Button
            variant={isMobile ? "ghost" : "default"}
            className="w-full justify-start"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </Link>
      )}
    </>
  );
}
