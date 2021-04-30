import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navbar } from 'react-bootstrap';
import {Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
// import request from "./backend.js";
import BackendAPI from "./js/BackendAPI";
import {useHistory} from 'react-router-dom';
import "./login.css";
import LoggedInUser from "./js/user/LoggedInUser";
import UserNavbar from "./js/user/UserNavbar";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageUser, setErrorMessageUser] = useState("");
  const [errorMessagePwd, setErrorMessagePwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

    LoggedInUser.clearUser();
    // if (LoggedInUser.isLoggedIn())
    //     history.push("./profile");


  function handleSubmit(event) {
      event.preventDefault();
    setErrorMessageUser("");
    setErrorMessagePwd("");
    setErrorMessageUser("");

    if(username.trim().length === 0 || password.trim().length === 0 ){
      if(username.trim().length === 0 ){
        setErrorMessageUser("Username is required");
      }
      if(password.trim().length === 0 ) {
        setErrorMessagePwd("Password is required");
      }
     
    } 
    else {
      BackendAPI("http://localhost:8080/users/login", "admin", "welcome1", "POST",
      {username: username, password: password})
      .then(data => {
        setUsername(data.username.toString());
        setPassword(data.password.toString());
        console.log("successful login");
        LoggedInUser.setUser(data);
        history.push("./profile", data);
      })
      .catch(error =>{
        setErrorMessage("Incorrect username or password");
        console.log("unsuccessful login");
      })
    }
  }

  return (
    <div className="Login">
      <UserNavbar />


    <Form onSubmit={handleSubmit}>
      <h1>login</h1>

      {errorMessage && (
        <p className="error-user"> {errorMessage} </p>
      )}

      <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMessageUser && (
            <p className="error-user"> {errorMessageUser} </p>
          )}
        </Form.Group>
      <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessagePwd && (
            <p className="error-pwd"> {errorMessagePwd} </p>
          )}
        </Form.Group>
        <Form.Group>
            <Button block size="lg" type="submit" >Login
            </Button>
        </Form.Group>
      
        <Form.Group>
        <Link to="/registration">
            <Button block size ="lg" id="sign-up">Sign up</Button>
        </Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;