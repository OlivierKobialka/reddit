import { z } from "zod";

export const SuberdditValidator = z.object({
    name: z.string().min(3).max(25),
});

export const SuberdditSubscriptionValidator = z.object({
    subredditId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SuberdditValidator>;
export type SubscribeToSubredditPayload = z.infer<typeof SuberdditSubscriptionValidator>;
