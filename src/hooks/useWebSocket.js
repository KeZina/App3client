import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';



const useWebSocket = () => {
    const anonymous = ({
        name: null,
        auth: {
            temp: false,
            perm: false,
        },
        authType: function() {
            if(this.auth.temp === true) {
                return 'temp';
            } else if(this.auth.perm === true) {
                return 'perm';
            } else {
                return null;
            }
        }
    })

    const [ws, setWs] = useState({});
    const [user, setUser] = useState(anonymous);
    const history = useHistory();

    const login = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'form', 
            name: e.target.name.value
        }));
        console.log(ws)
    }

    const logout = () => {
        ws.send(JSON.stringify({
            type: 'logout',
            token: localStorage.getItem('token'),
            authType: user.authType
        }))

        localStorage.removeItem('token');
    }

    // to avoid reconnect
    useEffect(() => {
        setWs(new WebSocket('ws://localhost:3003'))
    }, [])

    // redirect no-auth users to login
    useEffect(() => {
        if(!user.authType()) {
            history.push('/');
        }
    }, [user.auth, history.location.pathname])

    // check auth on every action
    useEffect(() => {
        ws.onopen = () => {
            if(localStorage.getItem("token")) {
                ws.send(JSON.stringify({
                    type: 'checkAuth', 
                    token: localStorage.getItem("token")
                }));
            }
        }
    })

    // handle server response
    useEffect(() => {
        ws.onmessage = e => {
            const data = JSON.parse(e.data);
            let {type, auth, token, name, message} = data;
            
            if(type === 'create') {
                if(auth) {
                    localStorage.setItem('token', token);
                    setUser({...user, name, auth});
                    history.push('/rooms');
                } else {
                    console.log(message);
                }
            } else if(type === 'auth') {
                if(auth) {
                    setUser({...user, name, auth});
                } else if(!auth) {
                    if(message === 'jwt expired') {
                        localStorage.removeItem('token');
                    }
                    setUser({...user, ...anonymous});
                }
            }
        }
        ws.onclose = () => {
            console.log('disconnected!');
        }
        ws.onerror = e => {
            console.log(e);
        }
    }, [ws])


    // just for debug
    useEffect(() => {
        console.log(user.authType())
        console.log(user)
    })

    return {
        login,
        logout,
        ...user
    }
}




export default useWebSocket;