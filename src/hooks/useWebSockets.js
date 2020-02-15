import { useState, useEffect } from 'react';
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
      // maybe rewrite after
      ws.onopen = () => {
        if(localStorage.getItem("token")) {
          ws.send(JSON.stringify({
              type: 'checkAuth', 
              token: localStorage.getItem("token")
          }));
        }

        if(localStorage.getItem('roomUrl')) {
            ws.send(JSON.stringify({
                type: 'getRoomData', 
                url: localStorage.getItem('roomUrl')
            }));
        }
      }

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

    return {
        user, 
        room
    }
}

export default useWebSockets;