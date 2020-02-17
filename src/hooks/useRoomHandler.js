import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const useRoomHandler = (ws, response, user) => {
    const initialRoom = {
        name: null,
        url: null
    }
    const [room, setRoom] = useState(initialRoom);
    const [roomList, setRoomList] = useState([]);
    const [notification, setNotification] = useState({
        exists: false,
        content: null
    });

    const history = useHistory();

    const createRoom = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createRoom',
            name: e.target.name.value
        }))
    }

    const getRoom = roomUrl => {
        localStorage.setItem('roomUrl', roomUrl)
        ws.send(JSON.stringify({
            type: 'getRoom',
            user,
            roomUrl
        }));
    }

    const getRoomList = () => {
        ws.send(JSON.stringify({
            type: 'getRoomList',
        }))
    }

    const exitRoom = () => {
        ws.send(JSON.stringify({
            type: 'exitRoom',
            user,
            roomUrl: localStorage.getItem('roomUrl')
        }))

        localStorage.removeItem('roomUrl');
        history.push('/rooms');
    }

    const inviteUser = name => {
        ws.send(JSON.stringify({
            type: 'inviteUser',
            name,
            path: localStorage.getItem('roomUrl'),
            roomUrl: history.location.pathname
        }))
    }

    const clearNotification = () => {
        setNotification({
            exists: false,
            content: null
        })
    }

    // after user is auth, get room's data
    useEffect(() => {
        if(user) {
            if(localStorage.getItem('roomUrl')) {
                ws.send(JSON.stringify({
                    type: 'getRoom',
                    roomUrl: localStorage.getItem('roomUrl'),
                    user
                }));
                ws.send(JSON.stringify({
                    type: 'getMessage',
                    roomUrl: localStorage.getItem('roomUrl')
                }))
            }
        }
    }, [user, localStorage.getItem('roomUrl')])

    useEffect(() => {
        let {type, success, name, list, path, roomUrl, message} = response;

        if(success) {
            if(type === 'createRoom') {
                setRoom({name, roomUrl});
                localStorage.setItem('roomUrl', roomUrl);
                history.push(`/rooms/${roomUrl}`)
            } else if(type === 'getRoom') {
                setRoom({name, roomUrl})
            } else if(type === 'getRoomList') {
                setRoomList(list);
            } else if(type === 'deleteRoom') {
                setRoom(initialRoom);
                localStorage.removeItem('roomUrl');
                history.push('/rooms');
            } else if(type === 'inviteUser') {
                console.log()
                setNotification({...notification, exists: true, content: {roomUrl, path}});
            }
        } else if(!success) {
            console.log(message)
        }

    }, [response])

    return {
        createRoom,
        getRoomList,
        getRoom,
        exitRoom,
        inviteUser,
        ...room,
        roomList,
        notification,
        clearNotification
    }
}

export default useRoomHandler;