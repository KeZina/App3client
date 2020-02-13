import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// if user not entered his name, redirect to initial page to log in

const useRedirect = (user) => {
    const history = useHistory();

    useEffect(() => {
        if(!user.isAuth) history.push('/')

    }, [user.auth, history.location.pathname])

}

export default useRedirect;