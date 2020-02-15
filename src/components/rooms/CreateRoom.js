import React, { useContext } from 'react';
import { RoomContext } from '../../context';

const CreateRoom = () => {
    const room = useContext(RoomContext);

    return(
        <div className = 'container-1'>
            <div id = 'create-room'>
                <form onSubmit = {room.createRoom}>
                    <label>
                        <span>Name:</span>
                        <input name = 'name' type = 'text' minLength = "3" maxLength = "20" />
                    </label>
                    <input type = 'submit' value = "create" />
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;