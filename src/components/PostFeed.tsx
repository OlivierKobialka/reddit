"use client";

import { ExtendedPost } from "@/types/db";
import React, { FC, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import axios from "axios";

interface PostFeedProps {
    initialPost: ExtendedPost[];
    subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({ initialPost, subredditName }) => {
    const lastPostRef = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const {} = useInfiniteQuery(
        ["infinite-query"],
        async ({ pageParam = 1 }) => {
            const query =
                `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
                (!!subredditName ? `&subredditName=${subredditName}` : "");

            const { data } = await axios.get(query);
            return data as ExtendedPost[];
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
            initialData: { pages: [initialPost], pageParams: [1] },
        }
    );

    return <ul className="flex flex-col col-span-2 space-y-6"></ul>;
};

export default PostFeed;
