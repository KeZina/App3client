import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

const useRouteHandler = (user, room) => {
    // const history = useHistory();

    // useEffect(() => {
    //     if(!localStorage.getItem('token')) {
    //         history.push('/');
    //     }
    // }, [localStorage.getItem('token'), history.location.pathname])


    // useEffect(() => {
    //     if(localStorage.getItem('roomUrl')) {
    //         history.push(`/rooms/${localStorage.getItem('roomUrl')}`);
    //     } else if(!localStorage.getItem('roomUrl') && !(history.location.pathname === '/rooms' || history.location.pathname === '/rooms/create-room')) {
    //         history.push('/rooms');
    //     }
    // }, [localStorage.getItem('roomUrl'), history.location.pathname])
}

export default useRouteHandler;