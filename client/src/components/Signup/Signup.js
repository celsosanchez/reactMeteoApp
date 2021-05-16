import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    cpassword: ""
  };
  send = async () => {
    const { name, email, password, cpassword } = this.state;
    if (!name || name.length === 0) return;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", this.state.email);
      window.location = "/home";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { name, email, password, cpassword } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="name" bsSize="large">
         <FormLabel>Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
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
          <FormGroup controlId="cpassword" bsSize="large">
          <FormLabel>Confirm Password</FormLabel>
            <FormControl
              value={cpassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button onClick={this.send} block bsSize="large" type="submit">
            Inscription
        </Button>
      </div>
        );
      }
}