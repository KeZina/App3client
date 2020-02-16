import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { useHistory } from 'react-router-dom';

// User can choose: temporary account (delete after logout), permanent (reserve his name, also there would be email-auth) or login (if already have permanent account).
const Login = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    const initialType = {
        temporary: false,
        permanent: false,
        login: false,
    }
    const [formType, setFormType] = useState(initialType);

    const handleFormType = type => setFormType({...initialType, [type]: true});
    const handleFormSubmit = e => {
        if(formType.permanent) {
            user.createPerm(e);
        } else if(formType.login) {
            user.login(e);
        } else {
            user.createTemp(e);
        }
    }

    useEffect(() => {
        if(user.authType() && history.location.pathname === '/') {
            history.push('/rooms');
        }
    }, [user.authType()])


    return (
        <div className = 'container-1'>
            <div id = "login">
                <div>
                    
                    {formType.permanent && <h2>Create permanent account</h2>}
                    {formType.login && <h2>Login</h2>}
                    {(!formType.permanent && !formType.login) && <h2>Create temporary account</h2>}
                    
                    <h4>
                        Don't want to waste your time?
                        <span onClick = {() => handleFormType('temporary')}> Get temporary registry...</span>
                    </h4>
                    <h4>
                        Want to hold your name?
                        <span onClick = {() => handleFormType('permanent')}> Get permanent regisrty...</span>
                    </h4>
                    <h4>
                        Already have permanent registry?
                        <span onClick = {() => handleFormType('login')}> Log In...</span>
                    </h4>
                    <form onSubmit = {e => handleFormSubmit(e)}>
                        <label>
                            <h3>Name:</h3>
                            <input type = "text" name = "name" minLength = "3" maxLength = "15" />
                        </label>
                        {
                            (formType.permanent || formType.login) &&
                            <label>
                                <h3>Password:</h3>
                                <input type = "password" name = "password" minLength = "6" maxLength = "15" />
                            </label>
                        }
                        <input type = "submit" value = "&#10004;" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;