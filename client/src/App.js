
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/home.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "./App.css";

class App extends Component {
  render() {
    return (//any coming request to /home must use private route who checks (isAuth)
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;