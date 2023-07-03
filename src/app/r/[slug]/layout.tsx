import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import ToFeedButton from "@/components/ToFeedButton";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns"; // check that library
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Techni Reddit",
    description:
        "A Reddit made for Cheatsheets in TechniSchools built with Next.js and TypeScript.",
};

const Layout = async ({
    children,
    params: { slug },
}: {
    children: ReactNode;
    params: { slug: string };
}) => {
    const session = await getAuthSession();

    const subreddit = await db.subreddit.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                },
            },
        },
    });

    const subscription = !session?.user
        ? undefined
        : await db.subscription.findFirst({
              where: {
                  subreddit: {
                      name: slug,
                  },
                  user: {
                      id: session.user.id,
                  },
              },
          });

    //   define if user is subscribed to subreddit smth like boolean
    const isSubscribed = !!subscription;

    if (!subreddit) return notFound();

    const memberCount = await db.subscription.count({
        where: {
            subreddit: {
                name: slug,
            },
        },
    });

    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>
                {/* button to take us back for UX requirements */}
                <ToFeedButton />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                    <ul className="flex flex-col col-span-2 space-y-6">
                        {children}
                    </ul>

                    {/* info sidebar */}
                    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3">
                                About r/{subreddit.name}
                            </p>
                        </div>

                        {/*
                         *  <dl> is a description list
                         *   <dt> is a term, or name
                         *   <dd> is the term's definition
                         *   <time> is a machine-readable element that can be parsed by a computer
                         */}
                        <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Created</dt>
                                <dd className="text-gray-700">
                                    <time
                                        dateTime={subreddit.createdAt.toDateString()}
                                    >
                                        {/*
                                            more data formats for further development fixes:
                                            dd MMM yyyy
                                            dd MMM yyyy HH:mm
                                            MMMM d, yyyy
                                            MMMM d, yyyy h:mm a
                                        */}
                                        {/*
                                            next fix:
                                            if community was created less than 24 hours ago,
                                            show "x hours ago"
                                            else show "dd MMM yyyy"
                                        */}
                                        {format(
                                            subreddit.createdAt,
                                            "MMMM d, yyyy"
                                        )}
                                    </time>
                                </dd>
                            </div>
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Members</dt>
                                <dd className="flex items-start gap-x-2">
                                    {/*
                                        next fix:
                                        1. if memberCount === 1, then show text "Only you"
                                        2. if memberCount === 1000 or next full number, then show text "1k" or "2k" or "1m" and so on
                                    */}
                                    <div className="text-gray-900">
                                        {memberCount}
                                    </div>
                                </dd>
                            </div>

                            {/*
                                next fix:
                                if subreddit.creatorId !== session?.user?.id, then show "Creator:       u/username"
                            */}
                            {subreddit.creatorId === session?.user?.id ? (
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">
                                        You created this community
                                    </dt>
                                </div>
                            ) : null}

                            {/* for conditional check and to prevent from 0 followers on subreddit */}
                            {subreddit.creatorId !== session?.user?.id ? (
                                <SubscribeLeaveToggle
                                    isSubscribed={isSubscribed}
                                    subredditId={subreddit.id}
                                    subredditName={subreddit.name}
                                />
                            ) : null}
                            <Link
                                className={buttonVariants({
                                    variant: "outline",
                                    className: "w-full mb-6",
                                })}
                                href={`r/${slug}/submit`}
                            >
                                Create Post
                            </Link>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
