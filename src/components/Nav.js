import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, CounterContext } from '../context';

const Nav = () => {
    const user = useContext(UserContext);
    const counter = useContext(CounterContext);

    return (
        <>
            <nav id = "navigation">
                <Link to = '/rooms'>Rooms</Link>
                {
                    user.authType() &&
                    <>
                        <div id = "center-side">
                            <div>
                                <span>
                                    Total users in site: {counter.usersInSite.length}
                                </span>
                            </div>
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