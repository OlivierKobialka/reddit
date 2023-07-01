import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./Icons";

const SignIn: FC = () => {
    return (
        <div className="conatiner mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-centere">
                <Icons.logo className="h-6 w-6 mx-auto" />
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome back!
                </h1>
                <p className="text-small max-w-xs"></p>
            </div>
        </div>
    );
};

export default SignIn;
