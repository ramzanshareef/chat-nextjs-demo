import { cookies } from "next/headers";
import ChatBox from "./ChatBox";
import { fetchChat } from "@/actions/user/chat";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

export default async function MainChat(params) {
    let res = await fetchChat(params.chatID);
    let logUser = jwt.verify(cookies().get("userToken")?.value, jwt_secret).id;
    if (res.status !== 200) {
        return (
            <>
                <div className="w-full h-[90vh] flex items-center justify-center">
                    <h1 className="text-2xl text-gray-400">
                        No Such Chat Found
                    </h1>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div
                    className="w-4/5 max-md:ml-14 md:mx-auto max-md:text-sm"
                >
                    <ChatBox chatID={params.chatID} logUser={logUser} />
                </div>
            </>
        );
    }

}