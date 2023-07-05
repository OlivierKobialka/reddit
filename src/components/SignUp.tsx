import { Icons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";

const SignUp = () => {
    return (
        <main className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <section className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-6 w-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
                    Sign Up
                </h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a Techni Reddit account
                    and agree to our User Agreement and Privacy Policy.
                </p>
            </section>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
                Already Techni Redittor?{" "}
                <Link
                    href="/sign-in"
                    className="hover:text-brand text-sm underline underline-offset-4"
                >
                    Sign In
                </Link>
            </p>
        </main>
    );
};

export default SignUp;
