import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context';
import { useHistory } from 'react-router-dom';

// User can just enter his name and create a temporary account (expires after he logout) or enter name and password and create a permanent account (and reserve his name)
const Login = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(user.authType()) history.push('/rooms')
    }, [user.auth])

    return (
        <div id = "login">
            <div>
                <h2>Enter your name</h2>
                {/* <h3>Or you can REGISTER...</h3> */}
                <form onSubmit = {user.login}>
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

export default Login;