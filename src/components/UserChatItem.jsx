import React from "react";
import userPic from "../assets/user.png";

const UserChatItem = () => {
    return (
        <div className="userChatList">
            <img src={userPic} alt="" />
            <div className="userChatItem">
                <span>Sahan</span>
                <p>Hello</p>
            </div>
        </div>
    )
}

export default UserChatItem