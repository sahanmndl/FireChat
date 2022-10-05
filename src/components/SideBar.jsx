import React from "react";
import Chats from "./Chats";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import UserChatItem from "./UserChatItem";

const SideBar = () => {
    return (
        <div className="sidebar">
            <NavBar />
            <SearchBar />
            <Chats />
        </div>
    )
}

export default SideBar