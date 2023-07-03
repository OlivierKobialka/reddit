"use client";

import React, { FC, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditorProps {
    subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
    //? useForm is a custom hook for managing forms with ease.
    //? It takes one object as optional argument.
    //? The following example demonstrates all of its properties along with their default values.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            subredditId,
            title: "",
            content: null,
        },
    });

    //? it's a good idea to initialize the editor only once because 
    //! it's a heavy operation and it's not necessary to do it every time the component is rendered.
    const initializeEditor = useCallback(async () => {
        // importing all the possible tools that can be used in the editor
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Embed = (await import("@editorjs/embed")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import("@editorjs/list")).default;
        const Code = (await import("@editorjs/code")).default;
        const LinkTool = (await import("@editorjs/link")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;
        const ImageTool = (await import("@editorjs/image")).default;

        
    }, []);

    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="subreddit-post-form"
                className="w-fit"
                onSubmit={() => {}}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <TextareaAutosize
                        // maxLength={100}
                        placeholder="Title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default Editor;
