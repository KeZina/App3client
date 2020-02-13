import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context';

const Nav = () => {
    const user = useContext(UserContext);

    return (
        <>
            <nav id = "navigation">
                <Link to = '/rooms'>Rooms</Link>
                {
                    user.isAuth &&
                    // <Logout />
                    <div>
                        <span>Your name: {user.name}</span>
                    </div>
                }
            </nav>
        </>

    )
}

export default Nav;