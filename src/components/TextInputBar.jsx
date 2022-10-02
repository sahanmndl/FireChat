import React from "react";
import addImage from "../assets/add-image.png";
import attach from "../assets/attach.png";

const TextInputBar = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Write a message..." />
            <div className="send">
                <img src={addImage} alt="" />
                <input type="file" style={{display: "none"}} id="file" />
                <label htmlFor="file">
                    <img src={attach} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default TextInputBar