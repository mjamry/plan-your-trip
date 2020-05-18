import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useUserState, UserActions} from '../State/UserState'


var Header = (props) => {
  const [session, dispatchState] = useUserState();

  return (
    <div className="header">
        {session.signedIn ? "signedIn" : "signedOut"}
        <button onClick={()=>dispatchState({
          type: UserActions.signIn
        })}>Sign In</button>

        <button onClick={()=>dispatchState({
          type: UserActions.signOut
        })}>Sign Out</button>
        <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
    </div>
  )
}

export default Header;