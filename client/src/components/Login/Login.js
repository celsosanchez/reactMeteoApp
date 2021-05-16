import React from "react";
import { Button, FormGroup, FormControl,  FormLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token); //save the token in localstorage to be chacked
      localStorage.setItem("email", this.state.email); //save the mail in localstorage to return cities
      window.location = "/Home";
    } catch (error) {
      console.error(error);
    }
  };
  sign = async () => {
    window.location = "/signup"//redirect action to login
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autocFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
        <Button onClick={this.sign} block bsSize="large" type="submit">
          SignUp
        </Button>
      </div>
    );
  }
}