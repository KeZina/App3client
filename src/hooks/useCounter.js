import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useCounter = (ws, response, user, room) => {
    const [usersInRoom, setUsersInRoom] = useState(0);
    const [usersInSite, setUsersInSite] = useState(0);
    const [roomsInSite, setRoomsInSite] = useState(0);

    useEffect(() => {
        if(user.authType()) {
            ws.send(JSON.stringify({
                type: 'counter',
                subject: 'usersInSite',
                name: user.name
            }))
        }
    }, [user])

    useEffect(() => {
        let {type, amount} = response;

        // console.log(response)

        if(type === 'usersInSite') {
            setUsersInSite(amount);
        }
    }, [response])

    return {
        usersInSite,
    }
}

export default useCounter;