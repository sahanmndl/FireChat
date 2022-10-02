import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import UserChatItem from "./UserChatItem";

const SideBar = () => {
    return (
        <div className="sidebar">
            <NavBar />
            <SearchBar />
            <UserChatItem />
        </div>
    )
}

export default SideBar