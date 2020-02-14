import { useState, useEffect } from 'react';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';

const useWebSockets = () => {
    const [ws, setWs] = useState({});
    useEffect(() => {
      setWs(new WebSocket('ws://localhost:3003'));
    }, [])

    const user = useUserHandler(ws);
    const room = useRoomHandler(ws);

    return {
        user, 
        room
    }
}

export default useWebSockets;