import React, { useContext } from 'react';
import { RoomContext } from '../../context';

const Room = () => {
    const room = useContext(RoomContext);
    console.log(room)

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <h2>{room.name}</h2>
            </div>
        </div>
    )
}

export default Room;