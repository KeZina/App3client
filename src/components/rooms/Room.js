import React, { useState, useContext } from 'react';
import { RoomContext, MessageContext, CounterContext } from '../../context';
import Message from './Message';

const Room = () => {
    const [listVisible, setListVisible] = useState(false);
    const handleList = () => setListVisible(!listVisible);

    const room = useContext(RoomContext);
    const messages = useContext(MessageContext);
    const counter = useContext(CounterContext);

    const usersInSite = counter.usersInSite;

    // const usersInSiteList = usersInSite && Object.entries(usersInSite).map(user => {
    //     console.log(user)
    //     return (
    //         <span onClick = {() => room.inviteUser(user[1])}>
    //             {user[0]}
    //         </span>
    //     )
    // })

    const usersInSiteList = usersInSite.map(user => {
        return (
            <span key = {user.name} onClick = {() => room.inviteUser(user.name)}>
                {user.name}
            </span>
        )
    })
    

    const usersInRooms = counter && counter.usersInRooms[localStorage.getItem('roomUrl')];
    const usersInRoomsList = usersInRooms && usersInRooms.map(user => {
        return (
            <span key = {user}>
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
                    <button onClick = {handleList}>
                        Invite user
                    </button>
                </div>
                {
                    listVisible &&
                    <div className = 'user-list'>
                        <h3>
                            Users to invite:
                        </h3>
                        {usersInSiteList}
                    </div>
                }
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