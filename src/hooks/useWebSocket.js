import { useEffect, useState } from "react";


const useWebSocket = () => {
    const [user, setUser] = useState(null);

    const login = e => {
        setUser(new FormData(e));
    }

    const ws = new WebSocket('ws://localhost:3003');

    useEffect(() => {
        ws.onopen = () => {
            ws.send("hi there!");
        }
        ws.onmessage = message => {
            console.log(message.data)
        }
        ws.onclose = () => {
            console.log("disconnected!");
        }
        ws.onerror = e => {
            console.log(e);
        }
    }, [user])

    return {
        login
    }
}

export default useWebSocket;