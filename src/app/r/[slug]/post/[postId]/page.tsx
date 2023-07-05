// import CommentsSection from "@/components/CommentsSection";
import EditorOutput from "@/components/EditorOutput";
// import PostVoteServer from '@/components/post-vote/PostVoteServer'
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface SubRedditPostPageProps {
    params: {
        postId: string;
    };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
    const cachedPost = (await redis.hgetall(
        `post:${params.postId}`
    )) as CachedPost;

    let post:
        | (Post & {
              votes: Vote[];
              Author: User;
          })
        | null = null;

    if (!cachedPost) {
        post = await db.post.findFirst({
            where: {
                id: params.postId,
            },
            include: {
                votes: true,
                author: true,
            },
        });
    }

    if (!post && !cachedPost) return notFound();

    return (
        <div>
            <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
                
            </div>
        </div>
    );
};

export default SubRedditPostPage;
