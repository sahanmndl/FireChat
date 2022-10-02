import React from "react";
import userPic from "../assets/user.png";

const SearchBar = () => {
    return (
        <div className="searchBar">
            <div className="searchForm">
                <input type="text" placeholder="Search Users..." />
            </div>
            <div className="userChatList">
                <img src={userPic} alt="" />
                <div className="userChatItem">
                    <span>Sahan</span>
                </div>
            </div>
        </div>
    )
}

export default SearchBar