"use client";

import { userLogout } from "@/actions/user/auth";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

export default function SidebarUsers({ users, presentUser }) {
    const router = useRouter();

    return (
        <>
            <div className="h-screen w-[25rem] flex flex-col justify-between border border-r-blue-300">
                <div>
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={handleSearch}
                        placeholder="Search for users or groups"
                        className="block w-4/5 mx-auto border border-gray-300 rounded-md m-4 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-md"
                    />
                    <ul>
                        {users?.map((user, index) => (
                            <li key={index} className="bg-blue-400 p-2 w-4/5 mx-auto block hover:bg-blue-500 hover:cursor-pointer text-white"
                                id={user._id}
                                onClick={() => {
                                    document.cookie = `chatWith=${user._id}`;
                                    router.replace(`/chat/${user._id}`);
                                }}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
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
    users: PropTypes.array.isRequired,
    presentUser: PropTypes.object.isRequired
};