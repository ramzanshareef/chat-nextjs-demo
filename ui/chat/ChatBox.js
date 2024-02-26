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
    const [umessages, setuMessages] = useState([]);

    useEffect(() => {
        if (effectRan.current === true) return;
        else {
            const channel = pusher.subscribe(`chat-${chatID}`);
            channel.bind("new-message", (data) => {
                setuMessages((prev) => [...prev, data.message]);
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
            let res = await fetchChat(
                document.cookie.split(";").find((c) => c.includes("chatWith")).split("=")[1]
            );
            if (res.status === 200) {
                setuMessages(res.messages.messages);
            }
        };
        getMessage();
    }, []); // to fetch messages

    useEffect(() => {
        const chatBox = document.querySelector(".messages");
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [umessages]); // to scroll chat box to bottom

    return (
        <>
            <div className="w-full">
                <div className="messages h-[90vh] p-6 overflow-x-auto">
                    {
                        umessages?.length === 0 &&
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">No messages yet</h1>
                        </div>
                    }
                    {umessages?.map((message, index) => {
                        return (
                            <div key={index}>
                                <div id={
                                    index
                                } className={message.sender === logUser ? "text-right" : "hidden"}>
                                    <div className="message-box inline-block bg-blue-500 p-2 my-2 rounded-lg text-white">
                                        <p >{message.message}</p>
                                    </div>
                                </div>
                                <div id={
                                    index
                                } className={message.sender !== logUser ? "text-left" : "hidden"}>
                                    <div className="message-box inline-block bg-purple-500 p-2 my-2 rounded-lg text-white">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-2">
                    <form action={sendMsg} id="msgSend">
                        <input type="text" name="msg"
                            className="w-11/12 h-10 border-2 border-gray-300 rounded-lg px-2 "
                            placeholder="Type your message here"
                        />
                        <input type="hidden" name="chatID"
                            value={chatID}
                        />
                        <button
                            type="submit"
                            className="w-1/12 px-2 py-1 h-10 bg-blue-500 text-white rounded-lg">Send</button>
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