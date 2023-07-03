import { z } from "zod";

export const PostValidator = z.object({
    title: z
        .string()
        .min(1, { message: "Title must be longer than 3 characters!" })
        .max(128, { message: "Title must be shorter than 128 characters!" }),

    subredditId: z.string(),
    content: z.any(),
    //! I used any bc of the editor we used to make posts has a specific format
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
