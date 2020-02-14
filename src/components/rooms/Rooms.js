import React from 'react';
import { Link } from 'react-router-dom';

const Rooms = () => {
    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div>
                    <Link to = '/rooms/create-room'>
                        Create new room
                    </Link>
                    <button>
                        Join existing room
                    </button>
                </div>

                <form>
                    <label>
                        <h3>Room's name:</h3>
                        <input type = "text" name = "name" minLength = "3" maxLength = "15" />
                    </label>
                    <input type = "submit" value = "&#10004;" />
                </form>
            </div>
        </div>
    )
}

export default Rooms;