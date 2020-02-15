import { useState, useEffect } from 'react';


const useMessageHandler = (ws, response, sender) => {
    const [data, setData] = useState([]);

    const send = e => {
        e.preventDefault();

        ws.send(JSON.stringify({
            type: 'createMessage',
            content: e.target.message.value,
            date: Date.now(),
            sender
        }))
    }

    useEffect(() => {
        let {type, content, message, success} = response;
        console.log(response)

        if(success) {
            if(type === 'createMessage') {
                setData([...data, content]) 
            }
            if(type === 'getMessage') {
                setData(content);
            }
        } else if(!success) {
            console.log(message)
        }
    }, [response])

    return {
        send,
        data
    }
}

export default useMessageHandler;