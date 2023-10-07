import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forget from "./pages/Forget";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Redirect to="/home" />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          {isLoggedIn && <Home />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {!isLoggedIn && (
          <Route path="/forget">
            <Forget />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
