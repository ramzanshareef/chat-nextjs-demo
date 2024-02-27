import User from "@/models/User";
import SidebarUsers from "./SidebarUsers";
import { cookies } from "next/headers";
import Chat from "@/models/Chat";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const getUser = async () => {
    let token = cookies().get("userToken")?.value;
    if (!token) {
        return { users: [], presentUser: {} };
    }
    const presentUser = jwt.verify(token, jwt_secret);
    let users = await User.find();
    let chats = await Chat.find({}).populate({
        "path": "users",
        "select": "-password"
    });
    users = users.filter((user) => user._id.toString() !== presentUser.id);
    return { users, presentUser, chats };
};

export default async function ChatsSidebar() {
    const { users, presentUser, chats } = await getUser();
    return (
        <>
            <SidebarUsers users={JSON.parse(JSON.stringify(users))} presentUser={presentUser} chats={JSON.parse(JSON.stringify(chats))} />
        </>
    );
}