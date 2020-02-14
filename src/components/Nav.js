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
                    user.authType() &&
                    <>
                        <div id = "center-side">
                            <span>
                                Total users:
                            </span>
                            <span>
                                Total rooms:
                            </span>
                        </div>
                        <div id = "right-side">
                            <div>
                                {
                                    user.authType() === 'perm' && 
                                    <button onClick = {user.deleteAcc}>
                                        Delete account
                                    </button>
                                }
                                <button onClick = {user.logout}>
                                    Logout
                                </button>
                            </div>
                            <span>
                                Your name: {user.name}
                            </span>
                        </div>
                    </>
                }
            </nav>
        </>

    )
}

export default Nav;