import {Redirect} from "react-router-dom";
import React from "react";
import requestFromAPI from "../BackendAPI";

let LoggedInUser = (function() {
    let getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    let setUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    }

    let isLoggedIn = () => {
        return localStorage.getItem("user") !== null && localStorage.getItem("user") !== "none";
    }

    let clearUser = () => {
        localStorage.removeItem("user");
    }

    let redirect = () => {
        return <Redirect to="/login" />;
    }

    let updateUser = async () => {
        let user = getUser();
        requestFromAPI("/api/users/login", null, null, "POST",
            {username: user.username, password: user.password})
            .then(user => {
                this.setUser(user)
            })
            .catch(error => {
                console.log("Error: " + error);
            });
        return Promise.resolve(getUser());
    }

    return {
        getUser: getUser,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        clearUser: clearUser,
        redirect: redirect,
        updateUser: updateUser
    }
})();
export default LoggedInUser;