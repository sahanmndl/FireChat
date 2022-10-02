import React from "react";
import Chats from "./Chats";
import TextInputBar from "./TextInputBar";

const ChatWindow = () => {
    return (
        <div className="chatwindow">
            <div className="chatInfo">
                <span>Sahan</span>
            </div>
            <Chats />
            <TextInputBar />
        </div>
    )
}

export default ChatWindow