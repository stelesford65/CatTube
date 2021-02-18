import React from "react";
import { observer } from "mobx-react";
import LoginForm from "../components/LoginForm";
import "./App.css";

const SERVICE_URL = "http://cattube-env.eba-wbpixdq6.us-east-1.elasticbeanstalk.com/"; //Service to our API

class LoginPage extends React.Component {
  state = {
    userId: "", //In the state, we have the userID since
  };
//Recall that state is for the internal storage of dynamic data in a component, and can be used 
//to allow your component to keep track of its own data, especially when values change over time

  handleLoginChange = (event) => {
    this.setState({ userId: event.target.value }); //function for handling the change in log in
  };

  handleLoginSubmit = (event) => {   
    console.log("Attempting login...");
    if (event) event.preventDefault(); //Keeping the browser from refreshing
    if (!this.state.userId) {
      alert("Please enter an ID");
      return;
    }

    fetch(SERVICE_URL + "/user/" + this.state.userId) //Does the user exist?
      .then((response) => response.text())
      .then((text) => {
        try {
          let data = JSON.parse(text);
          alert("Success!");
          // Set user in App state
          this.props.setUser({ id: data.userId, name: data.name });
          // Redirect user to videos
          this.props.history.push({
            pathname: "/videos",
            state: {
              user: this.state.userId,
            },
          });
        } catch (error) {
          alert("User does not exist");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="app">
        <div className="container1">
          <LoginForm
            userId={this.state.userId}
            handleChange={this.handleLoginChange}
            handleSubmit={this.handleLoginSubmit}
          />
        </div>
      </div>
    );
  }
}

export default observer(LoginPage);
