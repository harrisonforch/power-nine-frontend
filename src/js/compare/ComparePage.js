import '../../css/ComparePage.css';
import React from "react";
import requestFromAPI from "../BackendAPI";
import DeckDisplay from "./DeckDisplay";
import user_logo from "../../static/user-logo.png";
import CompareNavBar from "./CompareNavBar";
import Button from 'react-bootstrap/Button';
//import FormControl from 'react-boostrap/lib/FormControl';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import LoggedInUser from '../user/LoggedInUser';


class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noDeck: false,
            //unsure if this is true / needed
            //fix the ternary operator syntax
            deck1: this.props.location.state !== undefined ? this.props.location.state.deck1: null,
            deck2: this.props.location.state !== undefined ? this.props.location.state.deck2: null,
            //deck: null,
            combinedDeck: null,
            isLoaded: false,
            error: null,
        }
        this.returnDefault = this.returnDefault.bind(this);
        //this.returnSame = this.returnSame.bind(this);
        this.returnDiff = this.returnDiff.bind(this);
    }




    componentDidMount() {
        //this.loadFakeDecks();(
        this.returnDefault(this.props.location.state.deck1, this.props.location.state.deck2)
        //initializing default decks
       // console.log(this.state.deck1);
        
    }


    getDecksDiv() {
        return (<div className={"decks-div border rounded"}>
            <div className={"container border-dark"}>
                {this.generateTable()}
            </div>
        </div>);
    }
    returnDefault(cards1, cards2){
        //e.preventDefault();
        var returnedCards = []
        console.log("single cards")
        console.log(cards1)
        for (var i = 0; i < cards1.length; i++){
            var inDeck = false
            for (var j = 0; j < returnedCards.length; j++){
                if (cards1[i].name === returnedCards[j].name){
                    inDeck = true
                }
            }
            if (inDeck == false){
                returnedCards.push(cards1[i])
            }
        }
        for (var i = 0; i < cards2.length; i++){
            var inDeck = false
            for (var j = 0; j < returnedCards.length; j++){
                if (cards2[i].name === returnedCards[j].name){
                    inDeck = true
                }
            }
            if (inDeck == false){
                returnedCards.push(cards2[i])
            }
        }
        console.log("TESTING RETURNED CARDS")
        console.log(returnedCards)
        //var returnDeck = this.state.deck1
        //returnDeck.cards = returnedCards
        this.setState({
            deck1: cards1,
            deck2: cards2,
            combinedDeck: returnedCards,
            isLoaded: true
        });
        console.log("TESTING COMBINED DECK")
        console.log(this.state.combinedDeck)
        // this.state.editedDeck.cards = returnedCards;

    }

    returnDiff(){
        //e.preventDefault();
        var cards1 = this.state.deck1.cards
        console.log(this.state.deck1)
        console.log(this.state.deck2)
        var cards2 = this.state.deck2.cards
        console.log(cards1)
        console.log(cards2)
        var returnedCards = []
        console.log("single cards")
        console.log(cards1)
        returnedCards = []
        for (var i = 0; i < cards1.length; i++){
            var hasSame = false;
            for (var j = 0; j < cards2.length; j++){
                if (cards1[i].name === cards2[j].name){
                    hasSame = true
                    break;
                }
            }
            if (hasSame == true){
                returnedCards.push(cards1[i])
            }
        }
        this.setState({
            deck1: cards1,
            deck2: cards2,
            combinedDeck: returnedCards,
            isLoaded: true
        });
        console.log("TESTING COMBINED DECK")
        console.log(this.state.combinedDeck)
        // this.state.editedDeck.cards = returnedCards;

    }
    



    render() {
        // this.loadFakeDecks();
        if (!this.state.isLoaded)
            return <div>Loading</div>;
        if (this.state.error !== null) {
            return (<div>
                Error when loading <br/>
                {this.state.error}
            </div>);
        }
        let deck = null
        if (this.state.combinedDeck !== null){
            deck = this.state.combinedDeck;
        }
        else{
            deck = this.state.deck1
        }
        deck = {cards: deck}
        
        
 
        //deck = {cards: deck}
        
        console.log("TESTING COMBINED DECK")
        console.log(this.state)
        console.log("TESTED COMBINED DECK")
        /*if (deck === null) {
            deck = this.state.deck;
        } else {
            deck = {cards: deck}
        }*/


        return (<div>
            {/*adding a new test comment*/}
            {/*Navbar*/}
            <CompareNavBar />
            <br></br>
            {/*Left-side image and username*/}
             
                    <Button variant="outline-primary" onClick = {this.returnDefault}>Same</Button>{' '}
                    <Button variant="outline-warning" onClick = {this.returnDiff}>Different</Button>{' '}
                    <br></br>
                    <br></br>
                    <div className = "flex-container" >
                    <DeckDisplay deck = {deck}/>

                </div>
            <div>
                
            </div>

        </div>);

    }
}


export default ComparePage;
