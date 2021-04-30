import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navbar } from 'react-bootstrap';
import {Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import BackendAPI from "./js/BackendAPI";
import {useHistory} from 'react-router-dom';
import "./registration.css";
import UserNavbar from "./js/user/UserNavbar";
import LoggedInUser from "./js/user/LoggedInUser";


function Registration() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessageFname, setErrorMessageFname] = useState("");
  const [errorMessageLname, setErrorMessageLname] = useState("");
  const [errorMessageUser, setErrorMessageUser] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePwd, setErrorMessagePwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  
  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessageFname("");
    setErrorMessageLname("");
    setErrorMessageUser("");
    setErrorMessageEmail("");
    setErrorMessagePwd("");
    setErrorMessage("");

    if(fname.trim().length === 0 || lname.trim().length === 0 || username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 ){
      if(fname.trim().length === 0){
        setErrorMessageFname("First name is required");
      }
      if(lname.trim().length === 0) {
        setErrorMessageLname("Last name is required");
      }
      if(username.trim().length === 0) {
        setErrorMessageUser("Username is required");
      }
      if(email.trim().length === 0) {
        setErrorMessageEmail("Email is required");
      }
      if(password.trim().length === 0) {
        setErrorMessagePwd("Password is required");
      }
    }
    else {
      BackendAPI("http://localhost:8080/users", "admin", "welcome1", "POST",
      {username: username, password: password, firstName: fname, lastName: lname, email: email})
      .then(data => {
        LoggedInUser.setUser(data);
        history.push("./profile", data);
      })
      .catch(error =>{
        setErrorMessage("User already exists. Please try again.");
      })
    }
  }

  return (
    <div className="Registration">
        <UserNavbar />

       
      <Form onSubmit={handleSubmit}>
        <h1>registration</h1>

        {errorMessage && (
          <p className="error-user"> {errorMessage} </p>
        )}
      
        <Form.Group size="lg" controlId="fname">
          <Form.Label>First Name</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control
            autoFocus
            type="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          {errorMessageFname && (
            <p className="error"> {errorMessageFname} </p>
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control
            type="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          {errorMessageLname && (
            <p className="error"> {errorMessageLname} </p>
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
           {errorMessageUser && (
            <p className="error"> {errorMessageUser} </p>
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Label className="required-star">*</Form.Label>
          <Form.Control 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {errorMessageEmail && (
            <p className="error"> {errorMessageEmail} </p>
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
            <p className="error"> {errorMessagePwd} </p>
          )}
        </Form.Group>

        <Form.Group>
            <Button block size="lg" type="submit">Sign up
            </Button>
        </Form.Group>
       
        <Form.Group>
            <Link to="/login">
                <Button block size ="lg">Log in</Button>
            </Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Registration;