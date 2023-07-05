import { z } from "zod";

export const UsernameValidator = z.object({
    name: z
        .string()
        .min(3, { message: "Username must contain at least 3 characters!" })
        .max(32, {
            message: "Username must not contain more than 32 characters!",
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message:
                "Username must only contain alphanumeric characters and underscores!",
        }),
});

export type UsernameRequest = z.infer<typeof UsernameValidator>;