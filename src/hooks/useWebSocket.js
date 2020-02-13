import { useEffect, useState } from "react";


const useWebSocket = () => {
    const [form, setForm] = useState(null);
    const [user, setUser] = useState({
        name: null,
        auth: {
            temp: false,
            perm: false
        },
        get isAuth(){
            return Object.values(this.auth).includes(true);
        }
    });

    const login = e => {
        e.preventDefault();
        setForm({
            name: e.target.name.value,
            type: 'login'
        })
    }

    const ws = new WebSocket('ws://localhost:3003');

    useEffect(() => {
        // wait untill user fill the form, then start ws connection
        form &&
        (() => {
            ws.onopen = () => {
                ws.send(JSON.stringify(form));
                
            }
            ws.onmessage = e => {
                console.log(e.data);
            }
            ws.onclose = () => {
                console.log("disconnected!");
            }
            ws.onerror = e => {
                console.log(e);
            }
        })()
    }, [form])

    return {
        login,
        ...user
    }
}

export default useWebSocket;