import React, { useContext } from 'react';
import { RoomContext, MessageContext, CounterContext } from '../../context';
import Message from './Message';

const Room = () => {
    const room = useContext(RoomContext);
    const messages = useContext(MessageContext);
    const counter = useContext(CounterContext);

    const usersInRooms = counter.usersInRooms[localStorage.getItem('roomUrl')];

    const usersInRoomsList = usersInRooms && usersInRooms.map(user => {
        return (
            <span>
                {user}
            </span>
        )
    })

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:

                    </h3>
                    <div>
                        {usersInRoomsList}
                    </div>
                </div>
                <div className = 'sidebar right'>
                    <button onClick = {room.exitRoom}>
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