import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col h-screen items-center justify-center">
            <h2>
                Welcome to Next Chat
            </h2>
            <Link
                className="bg-indigo-500 text-white w-fit py-2 px-2 rounded-lg"
                href="/chats"
            >
                My Chats
            </Link>
        </main>
    );
}
