"use client";

import { sendMessageForm } from "@/actions/user/chat";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useFormState } from "react-dom";


const ChatBox = (props) => {
    const [state, sendMsg] = useFormState(sendMessageForm, null);
    const router = useRouter();
    useEffect(() => {
        if (state?.status) {
            if (state.status === 200) {
                document.getElementById("msgSend").reset();
                router.push("/chat/" + props.chatID)
            }
            else {
                alert(state.message);
            }
        }
    }, [state])

    return (
        <>
            <div className="chat-box w-full">
                <div className="messages h-[90vh] p-6">
                    {
                        props.messages?.messages.length === 0 &&
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">No messages yet</h1>
                        </div>
                    }
                    {props.messages?.messages?.map((message, index) => {
                        return (
                            <div key={index} className={message.sender === props.logUser ? "text-right" : "text-left"}>
                                <div className="message-box inline-block bg-blue-500 p-2 my-2 rounded-lg">
                                    <p>{message.message}</p>
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
                            value={props.chatID}
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