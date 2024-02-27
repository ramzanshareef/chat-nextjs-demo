import MainChat from "@/ui/chat/MainChat";
import ChatBoxSkeleton from "@/ui/chat/skeletons/ChatBoxSkeleton";
import { Suspense } from "react";

export default async function IndChat({ params }) {
    return (
        <>
            <Suspense fallback={<ChatBoxSkeleton />}>
                <MainChat chatID={params.chatID} />
            </Suspense >
        </>
    );
}