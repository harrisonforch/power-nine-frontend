import React from "react";
import {Link} from "react-router-dom";
import '../../css/DeckPage.css';
import requestFromAPI from "../BackendAPI";
//import DeckDisplay from "./DeckDisplay";
import UserNavbar from "./DeckNavbar";
import user_logo from "../../static/user-logo.png";
import CardforDeckDisplay from "./cardforDeckDisplay";
import DeckStatsDisplay from "./deckStatsDisplay";

class DeckDisplay extends React.Component {
    //call function to generate individal cards


    componentDidMount(){
        //add calculations functions here
    }
    generateCardTables(){

        const tableRows = [];
        var cards = this.props.deck.cards
        console.log(this.props)
        //console.log(cards)
        for (let i = 0; i < cards.length; i += 5) {
            //var current = cards[i]
            tableRows.push(
                <div className={"row container"}>
                    {this.props.deck.cards.slice(i, i + 5).map(current =>
                        <div className={"col container"}>
                            <CardforDeckDisplay card={current} />
                        </div>
                    )}
                </div>
            )
            tableRows.push(<br />)
        }
        return tableRows;

    }

    totalCardTable(){
        return (<div>

                {this.generateCardTables()}

        </div>);
    }
    render() {
        return (<div>
            <br></br>
            <div className = "all-cards">
                {this.totalCardTable()}
            </div>
        </div>);
    }
}
export default DeckDisplay;