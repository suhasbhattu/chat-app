import React from 'react';
import { AiFillDelete, AiOutlineUser } from 'react-icons/ai';
import './ChatBoxHeader.css';

export interface ChatBoxHeaderProps {
    name: string;
    displayPic: string;
    status: string;
    onDeleteClick: (id: string) => void;
}

function ChatBoxHeader(props: ChatBoxHeaderProps) {

    const handleDeleteClick = () => {
        props.onDeleteClick('');
    };

    return (
        <div className="ChatBoxHeader-container">
            <div className="ChatBoxHeader-container-userPicture">
                <button className="pictureButton button"><AiOutlineUser /></button>
            </div>
            <div className="ChatBoxHeader-container-userInfo">
                <h4 className="ChatBoxHeader-container-userInfo-userName">{props.name}</h4>
                <span className="ChatBoxHeader-container-userInfo-userStatus">{props.status}</span>
            </div>
            <div className="ChatBoxHeader-container-deleteButton">
                <button className="deleteButton button" disabled onClick={handleDeleteClick}><AiFillDelete /></button>
            </div>
        </div>
    );
}

export default ChatBoxHeader;