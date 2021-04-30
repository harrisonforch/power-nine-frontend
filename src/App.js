import React from "react";
import Login from "./login.js";
import Registration from "./registration.js";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-bootstrap/Switch";

import UserPage from "./js/user/UserPage";
import DeckPage from "./js/deck/DeckPage";
import AdvancedSearch from "./js/search/AdvancedSearch";
import LoggedInUser from "./js/user/LoggedInUser";
import AllDecksDisplay from "./js/user/ViewAllDecks"
import ComparePage from "./js/compare/ComparePage";


export default function App() {
    let homeRoute = <Route exact path={"/"} component={AdvancedSearch} />
    if (LoggedInUser.isLoggedIn())
        homeRoute = <Route exact path={"/"} component={UserPage} />
    return (
        <Router>
            <Switch>
                {homeRoute}
                <Route path={"/deck"} component={DeckPage} />
                <Route path={"/profile"} component={UserPage} />
                <Route path={"/search"} component={AdvancedSearch} />
                <Route path={"/logout"} component={Login} />
                <Route exact path={"/login"} component={Login} />
                <Route exact path={"/registration"} component={Registration} />
                <Route exact path={"/alldecks"} component={AllDecksDisplay} />
                <Route path={"/compare"} component = {ComparePage}/>
            </Switch>
        </Router>
    );
};


