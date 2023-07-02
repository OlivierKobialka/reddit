import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SuberdditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        // 401 - Unauthorized
        if (!session?.user) {
            return new Response("Unauthorized!", { status: 401 });
        }

        const body = await req.json();
        const { name } = SuberdditValidator.parse(body);

        const subredditExists = await db.subreddit.findFirst({
            where: { name },
        });

        // 409 - Conflict
        if (subredditExists) {
            return new Response("Subreddit already exists!", { status: 409 });
        }

        const subreddit = await db.subreddit.create({
            data: {
                name,
                creatorId: session.user.id,
            },
        });

        await db.subscription.create({
            data: {
                userId: session.user.id,
                subredditId: subreddit.id,
            },
        });

        // 201 - Created
        return new Response(subreddit.name, { status: 201 });
    } catch (error) {
        // 422 - Unprocessable Entity
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 });
        }

        return new Response("Could not create subreddit!", { status: 500 });
    }
}
