import Editor from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
    params: {
        slug: string;
    };
}

const page = async ({ params }: PageProps) => {
    const subreddit = await db.subreddit.findFirst({
        where: { name: params.slug },
    });

    if (!subreddit) return notFound();

    return (
        <div className="flex-col flex items-start gap-6">
            <div className="border-b border-gray-200 pb-5">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="mt-2 ml-2 text-base font-semibold leading-6 text-gray-900">
                        Create post
                    </h3>
                    <p className="ml-1 mt-1 truncate text-small text-gray-500">
                        in r/{params.slug}
                    </p>
                </div>
            </div>

            {/* form to create post */}
            <Editor subredditId={subreddit.id} />

            {/* submit */}
            <div className="w-full flex justify-end">
                <Button
                    type="submit"
                    className="w-full"
                    form="subreddit-post-form"
                >
                    Post
                </Button>
            </div>
        </div>
    );
};

export default page;
