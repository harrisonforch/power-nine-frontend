import React from 'react';
import {Link} from "react-router-dom";

class CompareNavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand" href="#">PowerNine</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <Link to={"/"} className="nav-link active">Home</Link>
                        <Link to={"/search"} className="nav-link">Search</Link>
                        <Link to={"/deck"} className="nav-link">User Decks</Link>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <Link to={"/logout"} className="nav-link">Logout</Link>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default CompareNavBar;