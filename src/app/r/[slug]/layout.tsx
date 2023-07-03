// import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
// import ToFeedButton from "@/components/ToFeedButton";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({
    children,
    params: { slug },
}: {
    children: React.ReactNode;
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
                      username: session.user.id,
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                    <ul className="flex flex-col col-span-2 space-y-6">
                        {children}
                    </ul>
                    {/* info side bar */}
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
                                            "dd MMM yyyy HH:mm"
                                        )}
                                    </time>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
