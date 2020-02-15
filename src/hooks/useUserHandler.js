import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useUserHandler = (ws, response) => {
    // state for no-auth users
    const initialUser = ({
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
    const [user, setUser] = useState(initialUser);
    const history = useHistory();

    // temporary account
    const createTemp = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createTemp', 
            name: e.target.name.value
        }));
    }

    // permanent account
    const createPerm = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'createPerm', 
            name: e.target.name.value,
            password: e.target.password.value
        }));
    }

    // if user have permanent account he can login
    const login = e => {
        e.preventDefault();
        ws.send(JSON.stringify({
            type: 'login',
            name: e.target.name.value,
            password: e.target.password.value
        }))
    }

    // if temporary account, account will be deleted, if permanent account, just delete token
    const logout = () => {
        ws.send(JSON.stringify({
            type: 'logout',
            token: localStorage.getItem('token'),
            authType: user.authType()
        }))

        localStorage.removeItem('token');
        localStorage.removeItem('roomUrl')
    }

    // delete permanent account
    const deleteAcc = () => {
        ws.send(JSON.stringify({
            type: 'deleteAcc',
            token: localStorage.getItem('token')
        }))

        localStorage.removeItem('token');
    }

    // redirect no-auth user
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            history.push('/');
        }
    }, [localStorage.getItem('token'), history.location.pathname])

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
        let {type, auth, token, name, message} = response;

        if(type === 'createUser') {
            if(auth) {
                localStorage.setItem('token', token);
                setUser({...user, name, auth});
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
                setUser(initialUser);
            }
        }
    }, [response])

    return {
        createTemp,
        createPerm,
        login,
        logout,
        deleteAcc,
        ...user
    }
}





export default useUserHandler;