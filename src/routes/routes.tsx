import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }:any) {
    let isAuthenticated: Boolean = false;
    if (localStorage.getItem("isAuthenticated") === "true") {
        //localStorage.getItem("isAuthenticated") === "false"
        isAuthenticated = true;   
    }
  console.log("this", isAuthenticated);

  return (
    <Route
    {...rest}
    render={(props) =>
      true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
  );
}

export default ProtectedRoute;
