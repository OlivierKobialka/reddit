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
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                />
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
};

export default UserAccountNav;
