import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoomContext, MessageContext } from '../../context';

const Rooms = () => {
    const [listVisible, setListVisible] = useState(false);
    const room = useContext(RoomContext);
    const messages = useContext(MessageContext);

    const handleList = () => {
        setListVisible(true);
        room.getRoomList();
    }

    const enterRoom = roomUrl => {
        room.getRoom(roomUrl);
        messages.getMessage(roomUrl);
    }
    
    const roomList = room.roomList.map(room => {
        let roomUrl = room.roomUrl;
        return (
            <Link  to = {`/rooms/${room.roomUrl}`} key = {room.roomUrl} id = {room.roomUrl} onClick = {() => enterRoom(roomUrl)} >
                {room.name}
            </Link>
        )
    })

    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div className = 'buttons-container'>
                    <Link to = '/rooms/create-room'>
                        Create new room
                    </Link>
                    <button onClick = {handleList}>
                        Join existing room
                    </button>
                </div>
                {
                    listVisible &&
                    <div className = 'room-list'>
                        {roomList}
                    </div>
                }
            </div>
        </div>
    )
}

export default Rooms;