import '../../css/UserPage.css';
import React from "react";

import requestFromAPI from "../BackendAPI";
import DeckDisplay from "./DeckDisplay";
import user_logo from "../../static/user-logo.png";
import Badge from 'react-bootstrap/Badge';


//all to be changed -- fix internal code
class DeckStatsDisplay extends React.Component {

    constructor(props){
        super(props);
        this.deck = this.props.deck;
        console.log(this.deck);
        this.cards = this.deck.cards;
        this.aCMC = "";
        this.CB = 0;
        this.aPower = 0;
        this.aToughness = 0;

        this.aCMC = this.average_cmc();
        this.aPower = this.average_power();
        this.aToughness = this.average_toughness();
        this.lands = this.getLands();
        this.creatures = this.getCreatures();
        this.enchantments = this.getEnchantments();
        this.artifacts = this.getArtifacts();
        this.sorceries = this.getSorceries();
        this.instants = this.getInstants();

    }
    average_power(){
        var averagepower = 0;
        var count = 0;
        
        for (let i = 0; i < this.cards.length; i++){
           
            if (this.cards[i].power != null){
                averagepower += parseInt(this.cards[i].power)
                count++;
            }
            
        }
        averagepower = averagepower / count;
        averagepower = averagepower.toFixed(2);
        //console.log(averageCMC);
        return String(averagepower);

    }
   
    average_cmc(){
        var averageCMC = 0;
        for (let i = 0; i < this.cards.length; i++){
            averageCMC += this.cards[i].cmc
        }
        averageCMC = averageCMC / this.cards.length;
        averageCMC = averageCMC.toFixed(2);

        return String(averageCMC);

    }

    getLands(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("land") || cardType.includes("Land")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }

    getCreatures(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("creature") || cardType.includes("Creature")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }

    getInstants(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("instant") || cardType.includes("Instant")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }

    getSorceries(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("sorcer") || cardType.includes("Sorcer")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }

    getEnchantments(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("enchantment") || cardType.includes("Enchantment")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }

    getArtifacts(){
        var lands = 0;
        var currentcards = this.cards;
        var returnedCards = [];
        for (var i = 0; i < currentcards.length; i++){
            var cardType = currentcards[i].type_line;
            if (cardType.includes("artifact") || cardType.includes("Artifact")){
                lands = lands + 1;
            }

        }

        return String(lands);

    }
    componentDidMount(){
        
    }

    //functions to make - land, mana_cost, loyalty, 
    //cmc - average cmc
    //break down by color
    //average power
    //average toughness
    //number of lands
    //if it contains land --> then its a land
    
    /*
    color_breakdown(){

    }*/

   
    average_toughness(){
        var averagetoughness = 0;
        var count = 0;
        
        for (let i = 0; i < this.cards.length; i++){
            console.log("TESTING POWER")
            console.log(this.cards[i].toughness)
            if (this.cards[i].power != null){
                averagetoughness += parseInt(this.cards[i].toughness)
                count++;
            }
            
        }
        averagetoughness = averagetoughness / count;
        averagetoughness = averagetoughness.toFixed(2);
        //console.log(averageCMC);
        return String(averagetoughness);

    }

    render() {
        return (<div classname = "deckstats container row">
            <h1>
                {this.props.deck.deckName}
            </h1>
            <h2>
                Statistics:
            </h2>
            <h3>
            <Badge classname = " mana-badge " color = "danger" variant = "dark"> Average Mana Cost: {this.aCMC}
            </Badge>{' '}
            <br></br>
            <Badge classname = " mana-badge " color = "dangprimer" variant= "dark">Average Power: {this.aPower}
            </Badge>{' '}
            <br></br>
            <Badge classname = " mana-badge " color = "dangprimer" variant= "dark">Average Toughness: {this.aToughness}
            </Badge>{' '}
            <br></br>
            <hr></hr>
            <Badge variant= "primary">Land Cards: {this.lands}
            </Badge>{' '}
            <br></br>
            <Badge variant= "secondary">Creature Cards: {this.creatures}
            </Badge>{' '}
            <br></br>
            <Badge variant= "success">Enchantment Cards: {this.enchantments}
            </Badge>{' '}
            <br></br>
            <Badge variant= "warning">Artifact Cards: {this.artifacts}
            </Badge>{' '}
            <br></br>
            <Badge variant= "danger">Instant Cards: {this.instants}
            </Badge>{' '}
            <br></br>
            <Badge variant= "info">Sorcery Cards: {this.sorceries}
            </Badge>{' '}
            </h3>
        </div>);
    }
}
export default DeckStatsDisplay;