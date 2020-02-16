import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const useRoomHandler = (ws, response) => {
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
            url: localStorage.getItem('roomUrl')
        }))
    }

    const getRoom = (url) => {
        localStorage.setItem('roomUrl', url)
        ws.send(JSON.stringify({
            type: 'getRoom', 
            url: url
        }));
    }

    const getRoomList = () => {
        ws.send(JSON.stringify({
            type: 'getRoomList',
        }))
    }

    // const leftRoom

    useEffect(() => {
        let {type, success, name, list, url, message} = response;

        if(success) {
            if(type === 'createRoom') {
                setRoom({name, url});
                localStorage.setItem('roomUrl', url);
                history.push(`/rooms/${url}`)
            } else if(type === 'getRoom') {
                console.log(response)
                setRoom({name, url})
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
        deleteRoom,
        ...room,
        roomList
    }
}

export default useRoomHandler;