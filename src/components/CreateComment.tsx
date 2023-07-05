"use client";

import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import { CommentRequest } from "@/lib/validators/comment";

import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface CreateCommentProps {
    postId: string;
    replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
    return <div>CreateComment</div>;
};

export default CreateComment;
