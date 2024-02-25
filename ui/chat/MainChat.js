import ChatBox from "./ChatBox";
import { fetchChat } from "@/actions/user/chat";

export default async function MainChat(params) {
    let res = await fetchChat(params.userID);
    if (res.status !== 200) {
        return (
            <>
                <h1 className="text-center text-red-400">{res.status} Error Occurred</h1>
            </>
        );
    }
    else{
        return (
            <>
                <ChatBox userID={params.userID} messages={res.messages} logUser={res.senderID} chatID={JSON.parse(JSON.stringify(res.chatID))} />
            </>
        );
    }

}