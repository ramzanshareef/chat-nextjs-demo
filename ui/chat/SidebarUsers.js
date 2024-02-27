"use client";

import { userLogout } from "@/actions/user/auth";
import { createChat } from "@/actions/user/chat";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SidebarUsers({ presentUser, users, chats }) {
    const router = useRouter();

    return (
        <>
            <div className="h-screen w-[25rem] flex flex-col justify-between border border-r-blue-300">
                <div>
                    <ToastContainer />
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={handleSearch}
                        placeholder="Search for users or groups"
                        className="block w-4/5 mx-auto border border-gray-300 rounded-md m-4 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-md"
                    />
                    <div
                        className="flex flex-col overflow-y-auto"
                    >
                        {users?.map((user, index) => (
                            <div key={index} className=" py-1  hover:cursor-pointer text-center hover:bg-gray-200"
                                id={user._id}
                                onClick={async () => {
                                    let res = await createChat(user._id);
                                    if (res.status === 200) {
                                        router.push(`/chat/${res.chatID}`);
                                    }
                                    else {
                                        toast.error("Error opening chat", {
                                            position: "top-right",
                                            autoClose: 1500,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: false,
                                            progress: undefined,
                                            onClose: () => {
                                                router.push("/chats");
                                            }
                                        });
                                    }
                                }}
                            >
                                {user.name}
                            </div>
                        ))}

                        {chats?.map((chat, index) => (
                            <div
                                key={index}
                                className={` "py-1  hover:cursor-pointer text-center hover:bg-gray-200" 
                                ${chat.isGroupChat ? "block" : "hidden"}
                                    `}
                                id={chat._id}
                                onClick={() => {
                                    router.push(`/chat/${chat._id}`);
                                }}
                            >
                                {chat.isGroup ? chat.groupName : chat.users.filter((user) => user._id !== presentUser.id)[0]?.name
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center m-2">
                    Welcome {presentUser.name}
                    <button className="bg-blue-400 hover:bg-blue-500 m-2 px-2 py-1 text-white rounded-md" onClick={() => {
                        userLogout().then(() => {
                            router.push("/login");
                        });
                    }}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

SidebarUsers.propTypes = {
    presentUser: PropTypes.object.isRequired,
    chats: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};