import ChatsSidebar from "@/ui/chat/SidebarComp";
import PropTypes from "prop-types";

export default function ChatsLayout({ children }) {
    return (
        <div className="flex flex-row">
            <ChatsSidebar />
            {children}
        </div>
    );
}

ChatsLayout.propTypes = {
    children: PropTypes.node.isRequired
};