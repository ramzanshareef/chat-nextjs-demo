const ChatBoxSkeleton = () => {
    return (
        <div className="w-full">
            <div className="p-2 overflow-y-hidden bg-gray-200 border-b border-gray-600">
                <h1 className="text-gray-900 text-2xl">
                    ...
                </h1>
            </div>
            <div className="messages h-[85vh] p-6 overflow-x-auto">
                {[...Array(5)].map((_, index) => (
                    <div key={index}>
                        <div className="text-right">
                            <div className="message-box inline-block bg-indigo-500 p-2 my-2 rounded-lg text-white">
                                <p>Loading...</p>
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="message-box inline-block bg-white p-2 my-2 rounded-lg text-white">
                                <p>Loading...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-2">
                <form>
                    <input
                        type="text"
                        name="msg"
                        className="w-11/12 h-10 border-2 border-gray-300 rounded-lg px-2"
                        placeholder="Type your message here"
                        disabled
                    />
                    <input type="hidden" name="chatID" value="" />
                    <button
                        type="submit"
                        className="w-1/12 px-2 py-1 h-10 bg-blue-500 text-white rounded-lg"
                        disabled
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBoxSkeleton;
