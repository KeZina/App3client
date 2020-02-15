import React, { useContext } from 'react';
import { RoomContext } from '../../context';
import Message from './Message';

const Room = () => {
    const room = useContext(RoomContext);

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:
                    </h3>
                </div>
                <div className = 'sidebar right'>
                    <button>
                        Exit room
                    </button>
                    <button>
                        Invite user
                    </button>
                </div>
                <h2>{room.name}</h2>
                <div className = 'chat'>
                    <div className = 'message-container'>
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <form>
                        <input type = 'submit' value = 'Send message' />
                        <textarea name = 'message'></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room;