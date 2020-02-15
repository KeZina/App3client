import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const useRoomHandler = (ws, response) => {
    const initialRoom = {
        name: null,
        url: null
    }
    const [room, setRoom] = useState(initialRoom)

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

    // const leftRoom

    useEffect(() => {
        let {type, success, name, url, message} = response;

        if(success) {
            if(type === 'createRoom') {
                setRoom({name, url});
                localStorage.setItem('roomUrl', url);
                history.push(`/rooms/${url}`)
            } else if(type === 'getRoom') {
                setRoom({name, url})
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
        deleteRoom,
        ...room
    }
}

export default useRoomHandler;