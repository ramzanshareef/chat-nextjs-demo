"use client";

import { sendMessage } from "@/actions/user/chat";
import PropTypes from "prop-types";


const ChatBox = ({ userID, logUser, messages, chatID }) => {
    messages = [
        {
            sender: "65dae4a8768038619ffa6d8d",
            message: "Hello"
        },
        {
            sender: "65db12648547ccb453a411f0",
            message: "How are you?"
        },
        {
            sender: "65dae4a8768038619ffa6d8d",
            message: "I am fine"
        },
    ];

    const sendMsg = async (e) => {
        e.preventDefault();
        let mes = {
            sender: logUser,
            message: e.target.message.value
        };
        let res = await sendMessage(chatID, mes);
        console.log(res);
    };

    return (
        <>
            <div className="chat-box w-full">
                <div className="messages h-[90vh] p-6">
                    {messages?.map((message, index) => {
                        return (
                            <div key={index} className="message p-2 mb-2">
                                <div className={`w-fit p-2 rounded-full ${message.sender === logUser ? "bg-blue-500 text-white rounded-br-none float-right" : "bg-gray-300 text-black rounded-bl-none"}`}>
                                    {message.message}
                                </div>
                            </div>
                        );
                    })}

                </div>

                <div id="msgSend" className="p-2">
                    <form onSubmit={sendMsg}>
                        <input type="text" name="message" id=""
                            className="w-11/12 h-10 border-2 border-gray-300 rounded-lg px-2 "
                            placeholder="Type your message here"
                        />
                        <button className="w-1/12 px-2 py-1 h-10 bg-blue-500 text-white rounded-lg">Send</button>
                    </form>
                </div>
            </div>


        </>
    );
};

export default ChatBox;

ChatBox.propTypes = {
    userID: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    logUser: PropTypes.string.isRequired,
    chatID: PropTypes.string.isRequired
};