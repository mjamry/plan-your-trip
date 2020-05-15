import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSessionState, SessionActions} from './../State/SessionState'


var Header = (props) => {
  const [session, dispatchState] = useSessionState();

  return (
    <div className="header">
        {session.signedIn ? "signedIn" : "signedOut"}
        <button onClick={()=>dispatchState({
          type: SessionActions.signIn
        })}>Sign In</button>

        <button onClick={()=>dispatchState({
          type: SessionActions.signOut
        })}>Sign Out</button>
        <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
    </div>
  )
}

export default Header;