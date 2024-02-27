"use server";

import { cookies } from "next/headers";
import connectDB from "../connectDB";
import Chat from "@/models/Chat";
import User from "@/models/User";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

export const createChat = async (recieverID) => {
    try {
        await connectDB();
        let token = cookies().get("userToken")?.value;
        if (!token) {
            return { status: 401, message: "Unauthorized" };
        }
        const senderID = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
        let exisChat = await Chat.findOne({
            users: { $all: [senderID, recieverID] }
        });
        if (!exisChat) {
            exisChat = await Chat.create({
                users: [senderID, recieverID]
            });
        }
        return { status: 200, chatID: exisChat.id };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};

export const fetchChat = async (chatID) => {
    let token = cookies().get("userToken")?.value;
    if (!token) {
        return { status: 401, message: "Unauthorized" };
    }
    const senderID = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
    try {
        await connectDB();
        let exisChat = await Chat.findOne({ _id: chatID });
        let messages = await Chat.findById(exisChat.id).select("messages");
        let chatName;
        if (exisChat.isGroupChat) {
            chatName = exisChat.groupName;
        }
        else {
            await User.findById(exisChat.users.filter((user) => user.toString() !== senderID)[0]).select("name -_id").then((user) => {
                chatName = user.name;
            });
        }
        return { status: 200, messages: JSON.parse(JSON.stringify(messages)), chatName: chatName };
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
        chat.save().then(() => {
            pusher.trigger(`chat-${chatID}`, "new-message", {
                message: message
            });
        });
        return { status: 200, message: "Message sent" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};

export const sendMessageForm = async (currentState, formData) => {
    let msg = formData.get("msg");
    let chatID = formData.get("chatID");
    let socketID = formData.get("socketID");
    let senderID = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
    let message = { sender: senderID, message: msg };
    await sendMessage(chatID, message, socketID);
    return { status: 200, message: "Message sent" };
};