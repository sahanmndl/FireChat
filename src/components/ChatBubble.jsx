import React from "react";
import user from "../assets/user.png";

const ChatBubble = () => {
    return (
        <div className="message">
            <div className="messageInfo">
                <img src={user} alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
            </div>
        </div>
    )
}

export default ChatBubble