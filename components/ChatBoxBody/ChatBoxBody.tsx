import React, { useEffect, useRef } from 'react';
import { MessageState } from '../chatAppSlice';
import './ChatBoxBody.css';

export interface ChatBoxBodyProps {
    senderId: string;
    receiverId: string;
    messages: MessageState[]
}

function ChatBoxBody(props: ChatBoxBodyProps) {

    const
        messageEndRef = useRef<null | HTMLDivElement>(null),
        formatDate = (time: string) => {
            const
                dateTime = new Date(time),
                offset = dateTime.getTimezoneOffset(),
                date = new Date(dateTime.getTime() - (offset * 60 * 1000)),
                hour = date.getHours() > 11 ? date.getHours() - 12 : date.getHours(),
                minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
                dayHalf = date.getHours() > 11 ? 'PM' : 'AM';

            return `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}, ${hour}:${minutes} ${dayHalf}`;
        },

        handleMessageClick = (event: any) => {
            console.log(`${event} delete event triggered.`);
            console.log(`${event} another delete event triggered.`);
        },

        messagesBody = props.messages.map((message, index) => {
            const
                messageClassName: string[] = ['ChatBoxBody-wrapper'],

                chatBody = (
                    <div className="ChatBoxBody-chat">
                        <div className="ChatBoxBody-chat-text">{message.text}</div>
                        <div className="ChatBoxBody-chat-time">{formatDate(message.time)}</div>
                    </div>
                );

            if (props.senderId === message.sender) {
                messageClassName.push('ChatBoxBody-sender');
            } else {
                messageClassName.push('ChatBoxBody-receiver');
            }


            if (index === props.messages.length - 1) {
                return <div className={messageClassName.join(' ')} key={message.id} ref={messageEndRef} onClick={handleMessageClick}>{chatBody}</div>;
            } else {
                return <div className={messageClassName.join(' ')} key={message.id} onClick={handleMessageClick}>{chatBody}</div>;
            }
        }),

        scrollToBottom = () => {
            if (messageEndRef.current) {
                messageEndRef.current.scrollIntoView();
            }
        };

    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    return (
        <div className="ChatBoxBody-container">
            {messagesBody}
        </div>
    );
}

export default ChatBoxBody;