import React from "react";
import addPic from "../assets/addPic.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {

    const handleSubmission = (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FireChat</span>
                <span className="title">Sign Up</span>
                <form onSubmit={handleSubmission}>
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