"use server";

import { cookies } from "next/headers";
import connectDB from "../connectDB";
import Chat from "@/models/Chat";
import { revalidatePath } from "next/cache";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

// const Pusher = require("pusher");



export const fetchChat = async (recieverID) => {
    let token = cookies().get("userToken")?.value;
    if (!token) {
        return { status: 401, message: "Unauthorized" };
    }
    const senderID = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
    try {
        await connectDB();
        let exisChat = await Chat.findOne({
            users: { $all: [senderID, recieverID] }
        });
        if (!exisChat) {
            exisChat = await Chat.create({
                users: [senderID, recieverID]
            });

        }
        let messages = await Chat.findById(exisChat.id).select("messages");
        let chatID = await exisChat.id;
        revalidatePath(`/chat/${chatID}`);
        return { status: 200, messages: JSON.parse(JSON.stringify(messages)), chatID: chatID, senderID: senderID };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};

export const sendMessage = async (chatID, message) => {
    try {
        await connectDB();
        let chat = await Chat.findById(chatID);
        chat.messages.push(message);
        // const pusher = new Pusher({
        //     appId: process.env.PUSHER_APP_ID,
        //     key: process.env.PUSHER_KEY,
        //     secret: process.env.PUSHER_SECRET,
        //     cluster: process.env.PUSHER_CLUSTER,
        //     useTLS: true
        // });
        // pusher.trigger(`chat-${chatID}`, "message", {
        //     message: "Hello ramzan"
        // });
        await chat.save();
        return { status: 200, message: "Message sent" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};

export const sendMessageForm = async (currentState, formData) => {
    let msg = formData.get("msg");
    let chatID = formData.get("chatID");
    let senderID = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
    let message = { sender: senderID, message: msg };
    let res = await sendMessage(chatID, message);
    console.log(res);
    return { status: 200, message: "Message sent" };
};