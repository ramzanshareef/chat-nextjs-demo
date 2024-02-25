import MainChat from "@/ui/chat/MainChat";

export default async function IndChat({ params }) {
    return (
        <>
            <MainChat userID={params.user} />
        </>
    );
}