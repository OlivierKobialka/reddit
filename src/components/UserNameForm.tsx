"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UsernameValidator } from "@/lib/validators/username";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id" | "username">;
}

type FormData = z.infer<typeof UsernameValidator>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {} = useForm<FormData>({})

    return <form onSubmit={}></form>
}

export default UserNameForm;
