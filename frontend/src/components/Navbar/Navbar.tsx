import { Button } from "../ui/button";
import ThemeToggle from "../ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useTheme } from "@/providers/theme-provider";
import { BellDot, LogOut, Search, Settings2, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function Navbar(): JSX.Element {
  const { theme } = useTheme();
  const [avatarUrl, setAvatarUrl] = useState("");
  const DICEBEAR_URL = import.meta.env.VITE_DICEBEAR_URL;

  useEffect(() => {
    const seed = Math.random().toString(36).substring(2, 10);
    setAvatarUrl(`${DICEBEAR_URL}?seed=${seed}`);
  }, []);

  console.log(avatarUrl);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-12">
      {/* Image | Brand */}
      <nav className="flex flex-row items-center gap-5">
        <Link to="/">
          <img
            src={theme === "dark" ? "/brand.svg" : "/brand-dark.svg"}
            alt="DFCom"
          />
        </Link>
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 md:grow-0" />

        {/* Notifications Button */}
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-gray dark:hover:bg-background hover:cursor-pointer"
        >
          <BellDot className="size-5" />
        </Button>

        {/* Search Button */}
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-gray dark:hover:bg-background hover:cursor-pointer"
        >
          <Search className="size-5" />
        </Button>

        {/* Change Theme button */}
        <ThemeToggle />

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full hover:cursor-pointer"
            >
              <Avatar className="rounded-full size-10 border border-gray-200">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  <Skeleton />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
              <User />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
              <Settings2 />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
