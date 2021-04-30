import React from 'react';
import {Link} from "react-router-dom";
import LoggedInUser from "./LoggedInUser";

class UserNavbar extends React.Component {
    handleLogout() {
        if (LoggedInUser.isLoggedIn())
            return <Link to={"/login"} className="nav-link">Logout</Link>;
        return <Link to={"/login"} className="nav-link">Login</Link>;
    }

    handleRegister() {
        if (LoggedInUser.isLoggedIn())
            return <div></div>;
        return <Link to={"/registration"} className="nav-link">Register</Link>;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand" href="#">PowerNine</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {
                            LoggedInUser.isLoggedIn() ?
                                <Link to={"/profile"} className="nav-link active">Profile</Link> :
                                <div></div>
                        }
                        <Link to={"/search"} className="nav-link">Search</Link>
                        {
                            LoggedInUser.isLoggedIn() ?
                                <Link to={"/alldecks"} className="nav-link">All decks</Link> :
                                <div></div>
                        }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {this.handleLogout()}
                        {this.handleRegister()}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default UserNavbar