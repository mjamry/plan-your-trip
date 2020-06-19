import React, {useEffect, useState} from 'react';
import {useAppState} from '../State/AppState'
import useUserService from './../Services/UserService'
import Button from '@material-ui/core/Button';

var Header = (props) => {
  const [userName, setUserName] = useState(null);
  const [appState, dispatchUser] = useAppState(null);
  const userService = useUserService();


  useEffect(()=>
  {
    var getUserName = async () => {
      var user = await userService.getUser();
      setUserName(user.profile.name);
    }

    if(appState.userSignedIn){
      getUserName();
    }
  }, [appState.userSignedIn])

  return (
    <div className="header">
        <div className="header-content">
          <div className="header-title">Trip Planner</div>

          {appState.userSignedIn && appState.appInitialized && <div className="header-user">
            {userName} 
            <Button variant="contained" size="small" onClick={()=>userService.signOut()}>Sign Out</Button>
          </div>}
        </div>
    </div>
  )
}

export default Header;