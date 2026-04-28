"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase /> Track My Jobs
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="cursor-pointer">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name}</p>
                      <p>{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={async () => {
                      const result = await signOut();
                      if (result.data) {
                        router.push("/sign-in");
                      } else {
                        alert("Error logging out");
                      }
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black cursor-pointer"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="ghost"
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
