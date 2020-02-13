import React, { useContext } from 'react';
import { UserContext } from '../context';

const Login = () => {
    const user = useContext(UserContext);

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