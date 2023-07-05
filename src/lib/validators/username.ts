import { z } from "zod";

export const UsernameValidator = z.object({
    name: z
        .string()
        .min(3, { message: "Username must contain at least 3 characters!" })
        .max(32, {
            message: "Username must not contain more than 32 characters!",
        }),
});
