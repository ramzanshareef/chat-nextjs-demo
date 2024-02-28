"use client";

import { userLogout } from "@/actions/user/auth";
import { createChat } from "@/actions/user/chat";
import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import "react-toastify/dist/ReactToastify.css";

export default function SidebarUsers({ presentUser, users, chats }) {
    const router = useRouter();
    const [showNavbar, setShowNavbar] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/chats") {
            setShowNavbar(false);
        }
        else {
            setShowNavbar(true);
        }
    }, [pathname]);

    return (
        <>
            <div className="fixed top-0 min-h-screen z-50 text-gray-800">
                <div className={` h-screen w-[20rem] flex flex-col space-y-2 justify-between overflow-auto transition-all bg-indigo-400 max-md:w-60 z-50 fixed
                ${showNavbar === true ? "-left-96" : "left-0"}
            `}>
                    <div>
                        <div>
                            <ToastContainer />
                            <div className="flex flex-row pt-4 justify-between items-center ">
                                <GoSidebarExpand color="black" size={35}
                                    className={`cursor-pointer block ml-2
                                `}
                                    onClick={() => {
                                        setShowNavbar(!showNavbar);
                                    }}
                                />
                                <div className="cursor-pointer">
                                    <div className="relative mt-2">
                                        <span className="text-[0.6rem] text-white p-1 absolute left-0 top-0 rounded-full bg-red-500">
                                            12
                                        </span>
                                        <div className="p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="text-black w-6 h-6"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                // value={searchTerm}
                                // onChange={handleSearch}
                                placeholder="Search for users or groups"
                                className="block w-4/5  mx-auto border border-gray-300 rounded-md m-4 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-md"
                            />
                        </div>
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
                <div className={` shadow-sm border-2 border-indigo-400 bg-indigo-400 rounded-r-3xl min-h-screen overflow-auto transition-all w-[3.2rem] fixed z-50 flex flex-col space-y-2  ${showNavbar === false ? "-left-96" : "left-0"} `}>
                    <GoSidebarCollapse color="black" size={35}
                        className={` cursor-pointer absolute top-2 left-1
                         `}
                        onClick={() => setShowNavbar(!showNavbar)}
                    />
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