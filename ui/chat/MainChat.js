import PropTypes from "prop-types";
import ChatBox from "./ChatBox";
import { fetchChat } from "@/actions/user/chat";

export default async function MainChat(params) {
    const { messages, senderID, chatID, status } = await fetchChat(params.userID);
    if (status !== 200) {
        return (
            <>
                <h1 className="text-center text-red-400">{status} Error Occurred</h1>
            </>
        );
    }

    return (
        <>
            <ChatBox userID={params.userID} messages={messages} logUser={senderID} chatID={JSON.parse(JSON.stringify(chatID))} />
        </>
    );
}

MainChat.propTypes = {
    userID: PropTypes.string.isRequired
};