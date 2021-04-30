import React from "react";
import BackendAPI from "../BackendAPI";
import DeckDisplay from "./DeckDisplay";
import LoggedInUser from "./LoggedInUser";
import UserNavbar from "./UserNavbar";
import DeckRatingDisplay from "./DeckRatingDisplay";

class AllDecksDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            decks: null
        }
    }

    componentDidMount() {
        let user = LoggedInUser.getUser();
        BackendAPI("http://localhost:8080/decks", user.username, user.password, "GET")
            .then(data => {
                this.setState({
                    isLoaded: true,
                    decks: data
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isLoaded: true
                })
            });
    }

    generateTable() {
        const tableRows = [];
        for (let i = 0; i < this.state.decks.length; i += 4) {
            tableRows.push(
                <div className={"row d-flex m-3"}>
                    {this.state.decks.slice(i, i + 4).map((deck, k) => {
                        let j = i + k;
                        return <div className={"col-3 p-3 justify-content-center"}>
                            <DeckRatingDisplay deck={this.state.decks[j]} />
                        </div>;
                    })}
                </div>
            )
            tableRows.push(<br />)
        }
        return tableRows;
    }

    render() {
        if (!this.state.isLoaded)
            return <div>
                <UserNavbar />
                Loading...
        </div>;
        if (this.state.error !== null)
            return <div>There was an error while loading!</div>
        return <div className={"container"}>
            <UserNavbar />
            {this.generateTable()}
        </div>;
    }

}
export default AllDecksDisplay;