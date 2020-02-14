import React from 'react';

const Rooms = () => {
    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div>
                    <button>
                        Create new room
                    </button>
                    <button>
                        Join existing room
                    </button>
                </div>

                <form>
                    <label>
                        <h3>Name:</h3>
                        <input type = "text" name = "name" minLength = "3" maxLength = "15" />
                    </label>
                    <input type = "submit" value = "&#10004;" />
                </form>
            </div>
        </div>
    )
}

export default Rooms;