import React, { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            <Button size="sm" className="w-full" onClick={logInWithGoogle} isLoading={isLoading}>
                Google
            </Button>
        </div>
    );
};

export default UserAuthForm;
