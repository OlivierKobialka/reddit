"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

interface MiniCreatePostProps {
    session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <li className="overflow-hidden rounded-md bg-white shadow">
            <section className="h-full px-6 py-4 flex justify-between gap-6">
                <details className="relative">
                    <UserAvatar
                        user={{
                            name: session?.user?.name || null,
                            image: session?.user?.image || null,
                        }}
                    />

                    <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
                </details>

                <Input
                    readOnly
                    onClick={() => router.push(pathname + "/submit")}
                    placeholder="Create Post"
                />
                <Button
                    variant="ghost"
                    onClick={() => router.push(pathname + "/submit")}
                >
                    <ImageIcon className="text-zinc-600" />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => router.push(pathname + "/submit")}
                >
                    <Link2 className="text-zinc-600" />
                </Button>
            </section>
        </li>
    );
};

export default MiniCreatePost;
