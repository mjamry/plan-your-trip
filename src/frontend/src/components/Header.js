import React, {useEffect, useState} from 'react';
import {useUserState, UserActions} from '../State/UserState'
import useUserService from './../Services/UserService'

var Header = (props) => {
  const [userName, setUserName] = useState(null);
  const [user, dispatchUser] = useUserState(null);
  const userService = useUserService();


  useEffect(()=>
  {
    var getUserName = async () => {
      var user = await userService.getUser();
      setUserName(user.profile.name);
    }

    if(user.signedIn){
      getUserName();
    }
  }, [user.signedIn])

  return (
    <div className="header">
        <div className="header-content">
          <div className="header-title">Trip Planner</div>

          {user.signedIn && <div className="header-user">
            {userName} 
            <button className="btn" onClick={()=>userService.signOut()}>Sign Out</button>
          </div>}
        </div>
    </div>
  )
}

export default Header;