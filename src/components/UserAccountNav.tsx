/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import React, { FC } from "react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { UserAvatar } from "./UserAvatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    return (
        // User account dropdown menu
        <DropdownMenu>
            {/* User img badge */}
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>
            {/* User informations: name + email */}
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && (
                            <p className="font-medium">{user.name}</p>
                        )}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* User account dropdown menu items */}
                <DropdownMenuItem asChild>
                    <Link href="/">Feed</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/r/create">Create community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
