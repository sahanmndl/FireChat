import React, { useState } from "react";
import addPic from "../assets/addPic.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { async } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { LoadingButton } from "@mui/lab";
import { Alert, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmission = async (e) => {
        setLoading(true)
        setError(false)
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)

            const date = new Date().getTime()
            const storageRef = ref(storage, `${name + date}`)

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(response.user, {
                            name,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "users", response.user.uid), {
                            uid: response.user.uid,
                            name,
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
            setLoading(false)
        }
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
                    {/* <LoadingButton loading={loading} loadingIndicator="Loading…" variant="outlined">
                        Register
                    </LoadingButton> */}
                    <button>Register</button>
                    {loading ? <LinearProgress /> : null}
                    {error ? <Alert severity="error">Something went wrong!</Alert> : null}
                </form>
                <p>Already have an account? Sign in!</p>
            </div>
        </div>
    )
}

export default Register