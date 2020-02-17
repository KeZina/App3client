import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const useRoomHandler = (ws, response, user) => {
    const initialRoom = {
        name: null,
        url: null
    }
    const [room, setRoom] = useState(initialRoom);
    const [roomList, setRoomList] = useState([]);

    const history = useHistory();

    const createRoom = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createRoom',
            name: e.target.name.value
        }))
    }

    const deleteRoom = () => {
        ws.send(JSON.stringify({
            type: 'deleteRoom',
            roomUrl: localStorage.getItem('roomUrl')
        }))
    }

    const getRoom = (roomUrl) => {
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
    }, [user])

    useEffect(() => {
        let {type, success, name, list, roomUrl, message} = response;

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
        deleteRoom,
        ...room,
        roomList
    }
}

export default useRoomHandler;