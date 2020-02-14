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

    const createTemp = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createTemp', 
            name: e.target.name.value
        }));
    }

    const createPerm = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createPerm', 
            name: e.target.name.value,
            password: e.target.password.value
        }));
    }

    const login = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'login',
            name: e.target.name.value,
            password: e.target.password.value
        }))
    }

    const logout = () => {
        ws.send(JSON.stringify({
            type: 'logout',
            token: localStorage.getItem('token'),
            authType: user.authType()
        }))

        localStorage.removeItem('token');
    }

    const deleteAcc = () => {
        ws.send(JSON.stringify({
            type: 'deleteAcc',
            token: localStorage.getItem('token')
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
                } else if(!auth){
                    console.log(message);
                }
            } else if(type === 'login'){
                if(auth) {
                    localStorage.setItem('token', token);
                    setUser({...user, name, auth})
                } else if(!auth) {
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
        console.log(user)
    })

    return {
        createTemp,
        createPerm,
        login,
        logout,
        deleteAcc,
        ...user
    }
}




export default useWebSocket;