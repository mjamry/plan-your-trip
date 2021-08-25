import React from 'react';
import useUserService from './../Services/UserService'
import {Route} from 'react-router-dom'

const PrivateRoute = ({children, ...props}) => {
    const userService = useUserService();

    return (
        <>
            {userService.isAuthenticated && <Route {...props}/>}
        </>
    )
}

export default PrivateRoute