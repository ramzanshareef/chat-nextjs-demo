import User from "@/models/User";
import SidebarUsers from "./SidebarUsers";
import { cookies } from "next/headers";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const getUser = async () => {
    let token = cookies().get("userToken")?.value;
    if (!token) {
        return { users: [], presentUser: {} };
    }
    const presentUser = jwt.verify(token, jwt_secret);
    let users = await User.find();
    users = users.filter((user) => user._id.toString() !== presentUser.id);
    return { users, presentUser };
};

export default async function ChatsSidebar() {
    const { users, presentUser } = await getUser();
    return (
        <>
            <SidebarUsers users={JSON.parse(JSON.stringify(users))} presentUser={presentUser} />
        </>
    );
}