import React, { useContext } from "react";
import userPic from "../assets/user.png";
import {signOut} from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

const NavBar = () => {

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)

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