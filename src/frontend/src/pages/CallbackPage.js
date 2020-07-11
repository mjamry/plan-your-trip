import React, {useEffect} from 'react'
import useUserService from './../Services/UserService'
import useLoggerService from './../Services/Diagnostics/LoggerService'
import Loader from './../components/Loader'

const CallbackPage = ({history}) => {
    const userService = useUserService();

    const log = useLoggerService('CallbackPage');

    useEffect(()=>
    {
        userService.signInRedirectCallback().then((data) => {
            history.push("/")
        }).catch(e => {
            log.error("Error while signing in an user: ", e);
        })
    }, [])

    return (
        <Loader />
    )
}

export default CallbackPage;