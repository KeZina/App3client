import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const Nav = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const handleLoginVisible = () => setLoginVisible(!loginVisible);

    return (
        <>
            <nav id = "navigation">
                <Link to = '/rooms'>Rooms</Link>
                <div>
                    <button onClick = {handleLoginVisible}>Login</button>
                    <span>Your name: ?</span>
                </div>
            </nav>
            {
                loginVisible &&
                <Login close = {handleLoginVisible} />
            }
        </>

    )
}

export default Nav;