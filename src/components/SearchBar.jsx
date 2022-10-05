import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { TextField } from "@mui/material";

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", searchQuery)
        )
        
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (err) {
            setError(true)
        }
    }

    const handleKeyDown = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelectChat = async () => {
        const chatId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const response = await getDoc(doc(db, "chats", chatId))
            if(!response.exists()) {
                await setDoc(doc(db, "chats", chatId), {messages: []})

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [chatId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [chatId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [chatId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [chatId + ".date"]: serverTimestamp()
                })
            }
        } catch (err) {
            console.log(err)
        }
        
        setUser(null)
        setSearchQuery("")
    }

    return (
        <div className="searchBar">
            <div className="searchForm">
                <TextField
                    InputLabelProps={{style: {color: 'gray'} }}
                    fullWidth
                    type="text"
                    label="Search users..." 
                    variant="standard" 
                    onKeyDown={handleKeyDown}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {user && 
                <div className="userChatList" onClick={handleSelectChat}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatItem">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
            {error && <span>User not found!</span>}
        </div>
    )
}

export default SearchBar