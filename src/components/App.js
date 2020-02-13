import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Main from './Main';
import Rooms from './Rooms';
import useWebSocket from '../hooks/useWebSocket';
import { UserContext } from '../context';
import useRedirect from '../hooks/useRedirect';

const App = () => {
  const user = useWebSocket()

  useRedirect(user);

  return (
    <UserContext.Provider value = {user}>
      <Nav />
      <Switch>
        <Route exact path = '/' component = {Main} />
        <Route exact path = '/rooms' component = {Rooms} />
      </Switch>
    </UserContext.Provider>
  )
}

export default App;
