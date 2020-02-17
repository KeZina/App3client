import { useState, useEffect } from 'react';

const useMessageHandler = (ws, response, sender) => {
    const [data, setData] = useState([]);

    const send = e => {
        e.preventDefault();

        ws.send(JSON.stringify({
            type: 'createMessage',
            content: e.target.message.value,
            date: Date.now(),
            sender,
            roomUrl: localStorage.getItem('roomUrl')
        }))
    }

    const getMessage = () => {
        ws.send(JSON.stringify({
            type: 'getMessage',
            roomUrl: localStorage.getItem('roomUrl')
        }))
    }

    useEffect(() => {
        let {content} = response;
        
        setData(content);
    }, [response])

    return {
        send,
        getMessage,
        data
    }
}

export default useMessageHandler;