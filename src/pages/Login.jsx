import { Alert, LinearProgress } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmission = async (e) => {
        setError(false)
        e.preventDefault();

        const email = e.target[0].value.trim()
        const password = e.target[1].value.trim()

        if(email === "" || password === "") {
            setError(true)
            setErrorMessage("Please enter your details!")
        } else {
            setError(false)
            setLoading(true)
            try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate("/")
            } catch(err) {
                setError(true)
                setErrorMessage(err.message.toString())
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FireChat</span>
                <span className="title">Sign In</span>
                <form onSubmit={handleSubmission}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button disabled={loading}>Login</button>
                    {loading ? <LinearProgress /> : null}
                    {error ? <Alert severity="error">{errorMessage}</Alert> : null}
                </form>
                <p>
                    Don't have an account? <Link to="/register">Sign Up!</Link>
                </p>
            </div>
        </div>
    )
}

export default Login