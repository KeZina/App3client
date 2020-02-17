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

  const [counter, setCounter] = useState({
    usersInSite: [{}] ,
    usersInRooms: {}
  })

  // const [usersInSite, setUsersInSite] = useState([]);
  // const [usersInRooms, setUsersInRooms] = useState(new Map());

  const [ws, setWs] = useState({});
  useEffect(() => {
    setWs(new WebSocket('ws://localhost:3003'));
  }, [])

  useEffect(() => {
    ws.onopen = () => {
      if(localStorage.getItem("token")) {
        ws.send(JSON.stringify({
          type: 'checkAuth',
          name: user.name,
          roomUrl: localStorage.getItem('roomUrl'),
          token: localStorage.getItem("token")
        }));
      }
    }

    // Redirect response to correct hook
    ws.onmessage = e => {
      let response = JSON.parse(e.data);

      switch(response.handler) {
        case 'user':
          setUserResponse(response);
          return;
        case 'room':
          setRoomResponse(response);
          return;
        case 'message':
          setMessageResponse(response);
          return;
        case 'counter':
          if(response.type === 'usersInSite') {
              setCounter({...counter, usersInSite: response.content});
          } else if(response.type === 'usersInRooms') {
              setCounter({...counter, usersInRooms: response.content})
          }
          return;
      }
    }
  })

  const user = useUserHandler(ws, userResponse);
  const room = useRoomHandler(ws, roomResponse, user.name);
  const messages = useMessageHandler(ws, messageResponse, user.name);

  return {
      user, 
      room,
      messages,
      counter
  }
}

export default useWebSockets;