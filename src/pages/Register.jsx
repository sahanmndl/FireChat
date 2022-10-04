import React, { useState } from "react";
import user from "../assets/user.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Alert, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmission = async (e) => {
        setError(false)
        e.preventDefault()

        const displayName = e.target[0].value.trim()
        const username = e.target[1].value.trim()
        const email = e.target[2].value.trim()
        const password = e.target[3].value.trim()
        const file = e.target[4].files[0]

        if(displayName === "" || username === "" || email === "" || password === "") {
            setError(true)
            setErrorMessage("Please enter your details!") 
        } else if (password.length < 8) {
            setError(true)
            setErrorMessage("Password must be atleast 8 characters!") 
        } else if (e.target[4].files.length === 0) {
            setError(true)
            setErrorMessage("Please set a profile picture!")
        } else {
            setError(false)
            setLoading(true)
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password)
    
                const date = new Date().getTime()
                const storageRef = ref(storage, `${displayName + date}`)
    
                await uploadBytesResumable(storageRef, file).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateProfile(response.user, {
                                displayName,
                                photoURL: downloadURL
                            })
                            await setDoc(doc(db, "users", response.user.uid), {
                                uid: response.user.uid,
                                displayName,
                                username,
                                email,
                                photoURL: downloadURL
                            })
                            await setDoc(doc(db, "userChats", response.user.uid), {})
                            navigate("/")
                        } catch (err) {
                            console.log(err)
                            setError(true)
                            setLoading(false)
                        }
                    })
                })
            } catch (err) {
                console.log(err)
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
                <span className="title">Sign Up</span>
                <form onSubmit={handleSubmission}>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" id="file" style={{display: 'none'}} />
                    <label htmlFor="file">
                        <img src={user} alt="" />
                        <span>Set Profile Picture</span>
                    </label>
                    <button disabled={loading}>Register</button>
                    {loading ? <LinearProgress /> : null}
                    {error ? <Alert severity="error">{errorMessage}</Alert> : null}
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign In!</Link>
                </p>
            </div>
        </div>
    )
}

export default Register