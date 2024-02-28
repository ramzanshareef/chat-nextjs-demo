"use client";

import { fetchChat, sendMessageForm } from "@/actions/user/chat";
import PropTypes from "prop-types";
import pusherJs from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: "ap2"
});

const ChatBox = ({ chatID, logUser }) => {
    const [state, sendMsg] = useFormState(sendMessageForm, null);
    const effectRan = useRef(false);
    const [messages, setMessages] = useState([]);
    const [chatName, setChatName] = useState("");

    useEffect(() => {
        if (effectRan.current === true) return;
        else {
            const channel = pusher.subscribe(`chat-${chatID}`);
            channel.bind("new-message", (data) => {
                setMessages((prev) => [...prev, data.message]);
            });
            effectRan.current = true;
        }
    }, []); // to bind pusher event

    useEffect(() => {
        if (state?.status) {
            if (state.status === 200) {
                document.getElementById("msgSend").reset();
            }
            else {
                alert(state.message);
            }
        }
    }, [state]); // to show alert when message is not sent

    useEffect(() => {
        const getMessage = async () => {
            let res = await fetchChat(chatID);
            if (res.status === 200) {
                setMessages(res.messages.messages);
                setChatName(res.chatName);
            }
        };
        getMessage();
    }, [state]); // to fetch messages

    useEffect(() => {
        const chatBox = document.querySelector(".messages");
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]); // to scroll chat box to bottom

    return (
        <>
            <div className="border border-gray-200 bg-gray-200 rounded-md overflow-auto">
                <div className="p-2 border-b border-gray-600">
                    <h1 className="text-gray-900 text-2xl"> {chatName} </h1>
                </div>
                <div className="messages p-6 h-[86vh] md:h-[84vh] overflow-auto my-2 flex flex-col space-y-1">
                    {messages?.map((message, index) => {
                        return (
                            <div key={index}>
                                <div
                                    id={index}
                                    className={message.sender === logUser ? "text-right" : "hidden"}>
                                    <div className="message-box inline-block bg-indigo-500 p-2 rounded-lg text-white max-w-[50%] text-wrap overflow-x-auto">
                                        <p >{message.message}</p>
                                    </div>
                                </div>
                                <div
                                    id={index}
                                    className={message.sender !== logUser ? "text-left" : "hidden"}>
                                    <div className="message-box inline-block bg-white text-black p-2 my-2 rounded-lg max-w-[50%] text-wrap overflow-x-auto">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="border-t border-t-gray-600">
                    <form action={sendMsg} id="msgSend" className="flex flex-row justify-between space-x-2 sticky bottom-0 p-2 mb-0">
                        <input type="text" name="msg"
                            className=" max-md:w-full md:w-11/12 h-10 border-2 border-gray-300 rounded-lg px-2"
                            placeholder="Type your message here"
                        />
                        <input type="hidden" name="chatID"
                            value={chatID}
                            className="hidden"
                        />
                        <button
                            type="submit"
                            className="md:w-1/12 px-2 py-1 h-10 bg-indigo-500 text-white rounded-lg">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatBox;

ChatBox.propTypes = {
    chatID: PropTypes.string,
    logUser: PropTypes.string
};