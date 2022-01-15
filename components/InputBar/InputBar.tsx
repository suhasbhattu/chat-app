import React, { useState } from 'react';
import './InputBar.css';

export interface InputBarProps {
    onPostMessage: (message: string) => void;
}

function InputBar(props: InputBarProps) {

    const
        [message, setMessage] = useState(''),

        handleChange = ((event: any) => {
            setMessage(event.target.value);
        }),
        
        handleSubmit = ((event: any) => {
            props.onPostMessage(message);
            setMessage('');
            event.preventDefault();
        });

    let messageClassName: string[] = ['InputBar-sendButton'];

    if (message.length === 0) {
        messageClassName.push('InputBar-sendButton-disabled');
    }

    return (
        <form className="InputBar-container" onSubmit={handleSubmit}>
            <input className="InputBar-input" placeholder="Message" value={message} onChange={handleChange} />
            <input type="submit" value="Send" className={messageClassName.join(' ')} disabled={message.length === 0} />
        </form>
    );
}

export default InputBar;