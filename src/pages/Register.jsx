import React from "react";
import addPic from "../assets/addPic.png";

const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FireChat</span>
                <span className="title">Sign Up</span>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" id="file" style={{display: 'none'}} />
                    <label htmlFor="file">
                        <img src={addPic} alt="" />
                        <span>Set Profile Picture</span>
                    </label>
                    <button>Register</button>
                </form>
                <p>Already have an account? Sign in!</p>
            </div>
        </div>
    )
}

export default Register