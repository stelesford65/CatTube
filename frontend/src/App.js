import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import VideosPage from "./pages/VideosPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  setUser = (data) => {
    this.setState({ user: data });
  };

  render() {
    return (
      <BrowserRouter>
        <NavBar user={this.state.user} setUser={this.setUser} />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route
              exact
              path="/videos"
              render={(props) => (
                <VideosPage {...props} user={this.state.user} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <LoginPage {...props} setUser={this.setUser} />
              )}
            />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
