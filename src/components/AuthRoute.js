import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  // useEffect(()=>{
  //     const token = localStorage.getItem('token');
  // },[token])
  return (
    <Route {...rest} render={props =>
      token ?
        (
          <Component {...props} />
        )
        :
        (
          <Redirect to={{ pathname: "/" }}
          />
        )

    }
    />
  );
};


export default AuthRoute;
