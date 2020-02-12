import React from 'react';

const Login = ({close}) => {
    return (
        <div id = "login">
            <div>
                <button onClick = {close}>&#10008;</button>
                <h2>Enter your name</h2>
                {/* <h3>Or you can REGISTER...</h3> */}
                <form>
                    <label>
                        <h3>Name:</h3>
                        <input type = "text" minLength = "3" maxLength = "15" />
                    </label>
                    <input type = "submit" value = "&#10004;" />
                </form>
            </div>
        </div>
    )
}

export default Login;