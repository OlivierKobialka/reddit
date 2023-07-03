import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

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
          const isSubscribed = !!subscription

    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>
                {/* button to take us back for UX requirements */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-4 py-6">
                    <div className="flex flex-col col-span-2 space-y-6">
                        {children}
                    </div>
                    {/* info side bar */}
                    <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3">
                                About r/{subreddit.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
