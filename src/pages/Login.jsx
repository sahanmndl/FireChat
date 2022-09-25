import React from "react";
import addPic from "../assets/addPic.png";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FireChat</span>
                <span className="title">Sign In</span>
                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </form>
                <p>Don't have an account? Sign up!</p>
            </div>
        </div>
    )
}

export default Login