import React from "react";
import userPic from "../assets/user.png";

const NavBar = () => {
    return (
        <div className="navbar">
            <span className="logo">Sahan</span>
            <div className="user">
                <img src={userPic} alt="" />
                <span>Sahan</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default NavBar