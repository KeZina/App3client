import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Rooms from './Rooms';
import useWebSocket from '../hooks/useWebSocket';
import { UserContext } from '../context';

const App = () => {
  const user = useWebSocket()

  return (
    <UserContext.Provider value = {user}>
      <Nav />
      <Switch>
        <Route exact path = '/' component = {Login} />
        <Route exact path = '/rooms' component = {Rooms} />
      </Switch>
    </UserContext.Provider>
  )
}

export default App;
