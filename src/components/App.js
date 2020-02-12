import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Main from './Main';
import Rooms from './Rooms';
import useWebSocket from '../hooks/useWebSocket';
import { UserContext } from '../context';

const App = () => {
  useWebSocket();

  const user = {
    
  }

  return (
    <UserContext>
      <Nav />
      <Switch>
        <Route exact path = '/' component = {Main} />
        <Route exact path = '/rooms' component = {Rooms} />
      </Switch>
    </UserContext>
  )
}

export default App;
