import { useState, useEffect } from 'react';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';
import useMessageHandler from './useMessageHandler';

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
    const [messageResponse, setMessageResponse] = useState(responseFields);

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
                type: 'getRoom', 
                url: localStorage.getItem('roomUrl')
            }));
        }

        ws.send(JSON.stringify({
          type: 'getMessage'
        }))
      }

      ws.onmessage = e => {
        let response = JSON.parse(e.data);

        if(response.handler === 'user') {
          setUserResponse(response);
        } else if(response.handler === 'room') {
          setRoomResponse(response);
        } else if(response.handler === 'message') {
          setMessageResponse(response);
        }

      }
    })

    const user = useUserHandler(ws, userResponse);
    const room = useRoomHandler(ws, roomResponse);
    const messages = useMessageHandler(ws, messageResponse, user.name);

    return {
        user, 
        room,
        messages
    }
}

export default useWebSockets;