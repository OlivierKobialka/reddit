"use client";

import React, { FC } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const logInWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn("google", {});
        } catch (error) {
            // toast notification
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex justify-center", className)} {...props}>
            <Button
                size="sm"
                className="w-full"
                onClick={logInWithGoogle}
                isLoading={isLoading}
            >
                {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />}
                Google
            </Button>
        </div>
    );
};

export default UserAuthForm;
