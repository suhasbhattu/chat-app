import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectMessages, UserState } from '../chatAppSlice';
import ChatBoxBody from '../ChatBoxBody/ChatBoxBody';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import InputBar from '../InputBar/InputBar';
import './ChatBox.css';

export interface PostMessageProps {
    text: string;
    sender: string;
    receiver: string;
    time: string;
    parentId: string | null;
}

export interface UsersInfo {
    sender: UserState;
    receiver: UserState;
    onPost: (request: PostMessageProps) => void;
    onDelete: (id: string) => void;
}

function ChatBox(props: UsersInfo) {

    const
        messages = useAppSelector(selectMessages) || [],
        handlePostMessage = (message: string) => {
            const request: PostMessageProps = {
                text: message,
                sender: props.sender.id,
                receiver: props.receiver.id,
                time: new Date().toISOString(),
                parentId: null
            }
            props.onPost(request);
        },
        handleDeleteClick = () => {
            props.onDelete('');
        };

    return (
        <div className="ChatBox-container">
            <ChatBoxHeader name={props.receiver?.name} displayPic={props.receiver?.displayPicture} status={props.receiver?.status} onDeleteClick={handleDeleteClick} />
            <ChatBoxBody senderId={props.sender?.id} receiverId={props.receiver?.id} messages={messages} />
            <InputBar onPostMessage={handlePostMessage} />
        </div>
    );
}

export default ChatBox;