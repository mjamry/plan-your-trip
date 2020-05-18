import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useUserState, UserActions} from '../State/UserState'
import useUserService from './../Services/UserService'

var Header = (props) => {
  const [session, dispatchState] = useUserState();
  const userService = useUserService();

  return (
    <div className="header">
        {session.signedIn ? "signedIn" : "signedOut"}
        <button onClick={()=>userService.signIn()}>Sign In</button>
        <button onClick={()=>userService.signOut()}>Sign Out</button>
        <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
    </div>
  )
}

export default Header;