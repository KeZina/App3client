import { useState, useEffect } from 'react';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';
import useMessageHandler from './useMessageHandler';
import { useHistory } from 'react-router-dom';

const useWebSockets = () => {
  const history = useHistory();
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

  const [usersInSite, setUsersInSite] = useState([]);
  const [usersInRooms, setUsersInRooms] = useState(new Map());

  const [ws, setWs] = useState({});
  useEffect(() => {
    setWs(new WebSocket('ws://localhost:3003'));
  }, [])

  useEffect(() => {
    // maybe rewrite after
    ws.onopen = () => {

      if(localStorage.getItem("token")) {
        ws.send(JSON.stringify({
          type: 'checkAuth',
          name: user.name,
          roomUrl: localStorage.getItem('roomUrl'),
          token: localStorage.getItem("token")
        }));
      }

      if(localStorage.getItem('roomUrl')) {
        ws.send(JSON.stringify({
          type: 'getRoom', 
          url: localStorage.getItem('roomUrl')
        }));
        ws.send(JSON.stringify({
          type: 'getMessage',
          url: localStorage.getItem('roomUrl')
        }))
      }
    }

    // Redirect response to correct hook
    ws.onmessage = e => {
      let response = JSON.parse(e.data);
      // console.log(response)

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
            setUsersInSite(response.content);
          } 
          // else if(response.type === 'usersInRooms') {
          //   setUsersInRooms(new Map(response.content));
          // }
          return;
      }
    }
  })

  console.log(usersInRooms)

  useEffect(() => {
    if(ws.readyState) {
      if(localStorage.getItem('roomUrl')) {
        ws.send(JSON.stringify({
          type: 'checkAuth',
          name: user.name,
          roomUrl: localStorage.getItem('roomUrl'),
          token: localStorage.getItem("token")
        }))
      }
    }
  }, [localStorage.getItem('roomUrl')])



  const user = useUserHandler(ws, userResponse);
  const room = useRoomHandler(ws, roomResponse);
  const messages = useMessageHandler(ws, messageResponse, user.name);

  return {
      user, 
      room,
      messages,
      usersInSite
  }
}

export default useWebSockets;