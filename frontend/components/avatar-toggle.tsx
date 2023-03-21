import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";
import Link from "next/link";

const AvatarToggle = () => {
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <Link href={"/user"}>
          <DropdownMenuItem>
            <Icons.user className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href={'/signout'}>
         <DropdownMenuItem>
            <Icons.logout className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default AvatarToggle;
