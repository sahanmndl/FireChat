import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Chats = () => {

    const [chats, setChats] = useState([])

    const {currentUser} = useContext(AuthContext)
    //const {dispatch} = useContext()

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unSub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    // const handleChatSelection = (u) => {
    //     dispatch({type: "CHANGE_USER", payload: u})
    // }

    console.log(Object.entries(chats))

    return (
        <div>
            {Object.entries(chats)?.map((chat) => (
                <div
                    className="userChatList"
                    key={chat[0]}
                >
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats