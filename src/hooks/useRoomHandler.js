import { useState, useEffect } from 'react';


const useRoomHandler = (ws) => {
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
            // name: '' need to thinking how to get name :D
        }))
    }

    // useEffect(() => {
    //     ws.onmessage = e => {
    //         const data = JSON.parse(e.data);
    //         let {type} = data;

    //         console.log(data);
    //         // if (type === 'createRoom')
    //     }
    // }, [ws])

    return {
        createRoom,
        deleteRoom
    }
}

export default useRoomHandler;