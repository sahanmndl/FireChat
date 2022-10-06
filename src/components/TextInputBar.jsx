import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import addPic from "../assets/addPic.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import {v4 as uuid} from "uuid";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const TextInputBar = () => {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSendMsg = async () => {
        if(img) {
            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chat.id), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        }) 
                    })
                }
            )
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        setText("")
        setImg(null)
    }

    return (
        <div className="input">
            <input 
                type="text" 
                placeholder="Write a message..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="send">
                <div className="addImage">
                    <input 
                        type="file" 
                        style={{display: "none"}} 
                        id="file" 
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label htmlFor="file">
                        <img src={addPic} alt="" />
                    </label>
                </div>
                <IconButton size="large" onClick={handleSendMsg}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default TextInputBar