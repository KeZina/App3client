import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Rooms from './rooms/Rooms';
import { UserContext, RoomContext } from '../context';
import useWebSockets from '../hooks/useWebSockets';
import CreateRoom from './rooms/CreateRoom';

const App = () => {
  const { user, room } = useWebSockets();

  return (
    <UserContext.Provider value = {user}>
      <RoomContext.Provider value = {room}>
        <Nav />
        <Switch>
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/rooms' component = {Rooms} />
          <Route exact path = '/rooms/create-room' component = {CreateRoom} />
        </Switch>
      </RoomContext.Provider>

    </UserContext.Provider>
  )
}

export default App;
