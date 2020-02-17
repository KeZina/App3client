import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RoomContext, MessageContext } from '../context';

const Notification = () => {
    const history = useHistory();
    const room = useContext(RoomContext)
    const messages = useContext(MessageContext);

    const accept = () => {
        history.push(room.notification.content.roomUrl);
        room.getRoom(room.notification.content.path);
        messages.getMessage(room.notification.content.path);
        room.clearNotification();
    }
    const refuse = () => room.clearNotification();

    return (
        <div id = 'notification'>
            <div className = "notification-container">
                <h3>
                    Other users want to see you in the room.
                </h3>
                <div className = 'links'>
                    <Link onClick = {accept}>
                        Accept
                    </Link>
                    <Link onClick = {refuse}>
                        Refuse
                    </Link>
                </div>

            </div>
        </div>
    )

}

export default Notification;