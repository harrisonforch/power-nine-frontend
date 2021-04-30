import '../../css/UserPage.css';
import React from "react";
import requestFromAPI from "../BackendAPI";
import DeckDisplay from "./DeckDisplay";
import UserNavbar from "./UserNavbar";
import user_logo from "../../static/user-logo.png";
import LoggedInUser from "./LoggedInUser";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        if (!LoggedInUser.isLoggedIn())
            return LoggedInUser.redirect();
        this.state = {
            user: {
                username: LoggedInUser.getUser().username,
                password: LoggedInUser.getUser().password
            },
            isLoaded: false,
            error: null
        };
    }

    componentDidMount() {
        LoggedInUser.updateUser().then(user => {
            requestFromAPI("http://localhost:8080/users/login", "admin", "welcome1", "POST",
                {username: user.username, password: user.password})
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        user: data,
                    });
                })
                .catch(error => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                })
        });
    }

    generateTable() {
        const tableRows = [];
        for (let i = 0; i < this.state.user.decks.length; i += 4) {
            tableRows.push(
                <div className={"row"}>
                    {this.state.user.decks.slice(i, i + 4).map((deck, k) => {
                        let j = i + k;
                        return <div className={"col-3"}>
                            <DeckDisplay deck={this.state.user.decks[j]} rating={this.state.user.deckRatings[j]} />
                        </div>
                    })}
                </div>
            )
            tableRows.push(<br />)
        }
        return tableRows;
    }

    getUserDiv() {
        return (
            <div className={"card user-div"}>
                <img className={"card-img-top"} src={user_logo}  alt="User Logo"/> <br /> <br />
                <div className={"card-body"}>
                    <p className={"card-title"}>
                        <b className={"b"}>Username: </b> {this.state.user.username} <br />
                        <b className={"b"}>Name: </b> {this.state.user.firstName} {this.state.user.lastName} <br />
                        <b className={"b"}>Email: </b> {this.state.user.email} <br />
                    </p>
                    <p className={"card-subtitle"}>
                        <b className={"b"}>Number of decks: </b> {this.state.user.decks.length}
                    </p>
                </div>
            </div>
        )
    }

    getDecksDiv() {
        return (<div className={"decks-div border rounded"}>
            <div className={"container border-dark"}>
                {this.generateTable()}
            </div>
        </div>);
    }

    render() {
        if (LoggedInUser.isLoggedIn()) {
            if (!this.state.isLoaded)
                return <div>
                    <UserNavbar />
                    Loading...
                </div>;
            if (this.state.error !== null) {
                return <div>
                    Error when loading <br />
                    {this.state.error}
                </div>;
            }

            return <div>
                {/*Navbar*/}
                <UserNavbar />
                {/*Left-side image and username*/}
                {this.getUserDiv()}
                {/*Table of deck objects*/}
                {this.getDecksDiv()}
            </div>;
        }
        return LoggedInUser.redirect();
    }
}


export default UserPage;
