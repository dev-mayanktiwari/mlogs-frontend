"use client";

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { PenSquare, LogIn, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import useUserStore from "../store/userStore";

export function Navbar() {
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MLOGS
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {user ? (
            <>
              <Link to="/create">
                <Button>
                  <PenSquare className="w-4 h-4 mr-2" />
                  Write
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
