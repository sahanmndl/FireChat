import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import userPic from "../assets/user.png";
import { db } from "../firebase";

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)

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

    return (
        <div className="searchBar">
            <div className="searchForm">
                <input type="text" placeholder="Search Users..." onKeyDown={handleKeyDown} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {user && 
            <div className="userChatList">
                <img src={user.photoURL} alt="" />
                <div className="userChatItem">
                    <span>{user.displayName}</span>
                </div>
            </div>}
            {error && <span>User not found!</span>}
        </div>
    )
}

export default SearchBar