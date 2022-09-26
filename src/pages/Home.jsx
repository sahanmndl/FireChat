import React from "react";
import ChatWindow from "../components/ChatWindow";
import SideBar from "../components/SideBar";

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <SideBar />
                <ChatWindow />
            </div>
        </div>
    )
}

export default Home