import React, {useEffect, useState} from 'react';
import {useUserState, UserActions} from '../State/UserState'
import useUserService from './../Services/UserService'

var Header = (props) => {
  const [user, setUser] = useUserState(null);
  const userService = useUserService();

  useEffect(()=>{
      const getUser = async () => {
        const user = await userService.getUser();
        setUser(user.profile);
      }

      getUser();
  }, [])

  return (
    <div className="header">
        <div className="header-content">
          <div className="header-title">Trip Planner</div>


          {user && <div className="header-user">
            {user.name}
            <button className="btn" onClick={()=>userService.signOut()}>Sign Out</button>
          </div>}
        </div>
    </div>
  )
}

export default Header;