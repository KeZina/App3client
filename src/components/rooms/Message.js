import React from 'react';

const Message = ({messages = []}) => {
    messages.sort((a, b) => b.date - a.date);
    const data = messages.map(message => {
        return {...message, date: `${new Date(+message.date).toLocaleDateString()} ${new Date(+message.date).toLocaleTimeString()}`}
    })

    return data.map(item => {
        return (
            <div className = 'message' key = {Math.round(Math.random() * 1e5)}>
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