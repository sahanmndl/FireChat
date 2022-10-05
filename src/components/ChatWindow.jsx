import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";
import TextInputBar from "./TextInputBar";

const ChatWindow = () => {

    const {data} = useContext(ChatContext)

    return (
        <div className="chatwindow">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
            </div>
            <Messages />
            <TextInputBar />
        </div>
    )
}

export default ChatWindow