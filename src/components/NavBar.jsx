import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const {currentUser} = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
            </div>
        </div>
    )
}

export default NavBar