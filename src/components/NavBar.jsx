import React, { useContext } from "react";
import userPic from "../assets/user.png";
import {signOut} from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)

    return (
        <div className="navbar">
            <span className="logo">Sahan</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default NavBar