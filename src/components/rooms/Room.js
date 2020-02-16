import React, { useContext, useEffect } from 'react';
import { RoomContext, MessageContext } from '../../context';
import Message from './Message';
import { useHistory } from 'react-router-dom';

const Room = () => {
    const room = useContext(RoomContext);
    const messages = useContext(MessageContext);

    const history = useHistory();

    const exitRoom = () => {
        localStorage.removeItem('roomUrl');
        history.push('/rooms');
    }

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:
                    </h3>
                </div>
                <div className = 'sidebar right'>
                    <button onClick = {exitRoom}>
                        Exit room
                    </button>
                    <button>
                        Invite user
                    </button>
                </div>
                <h2>{room.name}</h2>
                <div className = 'chat'>
                    <div className = 'message-container'>
                        <Message messages = {messages.data}/>
                    </div>
                    <form onSubmit = {messages.send}>
                        <input type = 'submit' value = 'Send message' />
                        <textarea name = 'message'></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room;