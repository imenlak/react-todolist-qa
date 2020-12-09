import React from "react";
import { Route, Redirect} from "react-router-dom";

export function providerAuth() {

  const signin = (email) => {
    window.localStorage.setItem('is_logged', email);
  };

  const signout = () => {
    window.localStorage.removeItem('is_logged');
  };

  const isLogged = () => {
    return window.localStorage.getItem('is_logged') !== null;
  }

  return { signin, signout, isLogged };
}


export function PrivateRoute({ children, ...rest }) {
  let auth = providerAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLogged() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}