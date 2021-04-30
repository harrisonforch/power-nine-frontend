import React from "react";
import {Link} from "react-router-dom";
import '../../css/DeckPage.css';
import requestFromAPI from "../BackendAPI";
//import DeckDisplay from "./DeckDisplay";
import user_logo from "../../static/user-logo.png";
import CardforDeckDisplay from "./cardforDeckDisplay";

class DeckDisplay extends React.Component {
    //call function to generate individal cards


    componentDidMount(){
        //add calculations functions here
    }
    generateCardTables(){
        console.log("TESTING DECK DISPLAY")
        console.log(this.props)
        const tableRows = [];
        var cards = this.props.deck.cards
        
        //console.log(cards)
        for (let i = 0; i < cards.length; i +=6) {
            //var current = cards[i]
            tableRows.push(
                <div className={"row container"}>
                    {this.props.deck.cards.slice(i, i + 6).map(current =>
                        <div className={"col container"}>
                            {console.log(current)}
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