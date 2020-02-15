import React from 'react';

const Message = ({messages}) => {
    messages.data.sort((a, b) => b.date - a.date);
    const data = messages.data.map(message => {
        return {...message, date: `${new Date(+message.date).toLocaleDateString()} ${new Date(+message.date).toLocaleTimeString()}`}
    })

    console.log(data)

    return data.map(item => {
        return (
            <div className = 'message' key = {item.id}>
                <span>Send by: {item.sender}</span>
                <span>{item.date}</span>
                <p>
                    {item.content}
                </p>
            </div>
        )
    })


}

export default Message;