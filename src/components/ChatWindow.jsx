import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";
import Messages from "./Messages";
import TextInputBar from "./TextInputBar";

const ChatWindow = () => {

    const {data} = useContext(ChatContext)

    return (
        <div className="chatwindow">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="rightContainer">
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => signOut(auth)}
                    >
                        LOGOUT
                    </Button>
                </div>
            </div>
            <Messages />
            <TextInputBar />
        </div>
    )
}

export default ChatWindow