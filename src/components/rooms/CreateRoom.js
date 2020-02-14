import React, { useContext } from 'react';
import { RoomContext } from '../../context';

const CreateRoom = () => {
    const room = useContext(RoomContext);

    return(
        <div className = 'container-1'>
            <div id = 'create-room'>
                <form onSubmit = {room.createRoom}>
                    <label>
                        <input type = 'text' minLength = "3" maxLength = "20" />
                        <input type = 'submit' value = "create" />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;