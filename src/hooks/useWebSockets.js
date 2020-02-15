import { useState, useEffect } from 'react';
// import useRouteHandler from './useRouteHandler';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';

const useWebSockets = () => {
    const responseFields = {
      type: null, 
      auth: null, 
      token: null, 
      name: null, 
      message: null,
      handler: ''
    }
    const [userResponse, setUserResponse] = useState(responseFields);
    const [roomResponse, setRoomResponse] = useState(responseFields);

    const [ws, setWs] = useState({});
    useEffect(() => {
      setWs(new WebSocket('ws://localhost:3003'));
    }, [])

    // Redirect response to correct hook
    useEffect(() => {
      ws.onmessage = e => {
        let response = JSON.parse(e.data);

        if(response.handler === 'user') {
          setUserResponse(response);
        } else if(response.handler === 'room') {
          setRoomResponse(response);
        }

      }
    })

    const user = useUserHandler(ws, userResponse);
    const room = useRoomHandler(ws, roomResponse);
    // useRouterHandler(user, room)
    return {
        user, 
        room
    }
}

export default useWebSockets;