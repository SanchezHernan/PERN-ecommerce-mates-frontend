import React from "react";
import { Redirect } from "react-router-dom";
import useUser from '../../hook/useUser'

export default function Secret() {
  const {isLoggeed, logout} = useUser();

  return (
    <div>
      {
        isLoggeed ?
          <div>
            <h1>Secret</h1>
            <button onClick={logout}>Log out</button>
          </div>
        : <Redirect to='/'>
        </Redirect>
      }
        
     
    </div>
  );
}

