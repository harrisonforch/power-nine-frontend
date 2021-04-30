import React, {Component} from "react";
import requestFromAPI from "../BackendAPI";
import LoggedInUser from "../user/LoggedInUser";
import UserNavbar from "../user/UserNavbar";
import DeckDisplay from "../user/DeckDisplay";

class AdvancedSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            isWhite:'',
            isBlue:'',
            isBlack:'',
            isRed:'',
            isGreen:'',
            colorMatching:'3D',
            statInteger:'',
            statMatching:'d',
            statType:'cmc',
            rarity:'',
            isSubmitted: false,
            cardData: [],
            isLoaded: false,
            error: null,
            targetDeck:'',
            isCompleted: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addToDeck = this.addToDeck.bind(this)
        this.createDeck = this.createDeck.bind(this)
    }

    componentDidMount() {
        if (LoggedInUser.isLoggedIn()) {
            let user = LoggedInUser.getUser();
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
        }
    }

// Form submitting logic, prevent default page refresh
    handleSubmit(event){
        const { name, isWhite, isBlue, isBlack, isRed, isGreen, colorMatching, statInteger, statMatching, statType, rarity } = this.state
        event.preventDefault()
        this.setState({isSubmitted: true})
        alert(`
        Your Search\n
        Name: ${name}
        Color: ${isWhite}, ${isBlue}, ${isBlack}, ${isRed}, ${isGreen}
        Color Matching: ${colorMatching}
        Stats: ${statInteger}, ${statMatching}, ${statType}
        Rarity: ${rarity}
	    `)
        let nameParam = ''
        if(name != null) {
            nameParam = `${name}+`
        }
        let colorParam = ''
        if(isWhite !== '' || isBlue !== '' || isBlack !== '' || isRed !== '' || isGreen !== ''){
            colorParam = `c%${colorMatching}${isWhite}${isBlue}${isBlack}${isRed}${isGreen}+`
        }
        let statsParam = ''
        if(statInteger !== '' && statMatching !== '' && statType != ''){
            statsParam = `${statType}%3${statMatching}${statInteger}+`
        }
        let rarityParam = ''
        if(rarity !== ''){
            rarityParam = `r%3a${rarity}`
        }

        fetch(`https://api.scryfall.com/cards/search?q=${nameParam}${colorParam}${statsParam}${rarityParam}`,
            {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({cardData: []})
                for(let i = 0; i < data.total_cards; i++) {
                    this.setState(prevState => ({
                        cardData: [...prevState.cardData, data.data[i]]
                    }));
                }
                this.setState({isCompleted: true})
            })
    }

// Method causes to store all the values of the
// input field in react state single method handle
// input changes of all the input field using ES6
// javascript feature computed property names
    handleChange(event){
        let nam = event.target.name;
        let val = event.target.value;
        if(nam === "statInteger"){
            if(!Number(val)){
                alert("The value must be a number.")
                this.setState({[event.target.name] : ""})
                return
            }
        }
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name] : event.target.value
        })
    }

    createDeck(event){
        const ind = event.target.value
        const user = LoggedInUser.getUser();
        // TODO: Replace with drop-down of possible decks
        const enteredName = prompt('Please enter the name of your new deck')
        requestFromAPI("http://localhost:8080/decks", user.username, user.password, "POST",
            {deckName: enteredName, cards: [this.state.cardData[ind]]})
            .then(() => {
                alert("Deck " + enteredName + " created!")
            })
            .catch(() => {
                alert("Unable to create new deck with name " + enteredName);
            });
    }

    addToDeck(event){
        const ind = event.target.value
        const user = LoggedInUser.getUser();
        const namedDeck = prompt('Please enter the name of the deck')
        requestFromAPI(`http://localhost:8080/decks/${namedDeck}`, user.username, user.password, "PUT", this.state.cardData[ind])
            .then(() => {
                alert("Card added to deck " + namedDeck)
            })
            .catch(() => {
                alert("Unable to add card to deck " + namedDeck)
            })
    }

    renderDecksNamesMenu() {
        const user = LoggedInUser.getUser();
        return (<div className="btn-group" id={"menu"}>
            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                Select deck
            </button>
            <div className="dropdown-menu">
                {user.decks.map(deck => deck.deckName)}
            </div>
        </div>);
    }

    renderSearchResults(i){
        const tableRows = [];
        for (let i = 0; i < this.state.cardData.length; i = i + 3) {
            if (i >= 50)
                return tableRows;
            tableRows.push(
                <div className={"row justify-content-center"}>
                    {this.state.cardData.slice(i, i + 3).map((_, k) => {
                        let j = k + i;
                        if (this.state.cardData[j] === undefined)
                            return;
                        return (<div className={"col-3 pl-md-4 pr-md-4 justify-content-center"}>
                            {
                                LoggedInUser.isLoggedIn() ?
                                    (<span><button onClick={this.addToDeck} value={j}>Add to deck</button>
                                        <button onClick={this.createDeck} value={j}>Create a new deck with this card</button></span>) :
                                    <div></div>
                            }

                            <a href={this.state.cardData[j].scryfall_uri}>
                                <figure>
                                    {this.state.cardData[j].layout === 'transform' || this.state.cardData[j].layout === 'modal_dfc' ?
                                        <img src={this.state.cardData[j].card_faces[1].image_uris.small}/> :
                                        <img src={this.state.cardData[j].image_uris.small}/>
                                    }
                                    <figcaption>{this.state.cardData[j].name}</figcaption>
                                </figure>
                            </a>
                        </div>)
                    })}
                </div>
            );
        }
        return tableRows;
    }

// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
    render(){
        let i = 0;
        if (this.state.isSubmitted && !this.state.isCompleted) {
            return (
                <div>
                    <UserNavbar/>
                    <div>Loading...</div>
                </div>
            )
        }
        return(
            <div>
                <UserNavbar />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='name' style={{marginRight: '10px', marginTop: '10px'}}>Card Name</label>
                        <input
                            name='name'
                            placeholder='Any text in the name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input type="checkbox" id="whiteCheckbox" name="isWhite" value="w" onChange={this.handleChange}></input>
                        <label htmlFor="whiteCheckbox" style={{marginRight: '12px', marginLeft: '3px'}}>White</label>
                        <input type="checkbox" id="blueCheckbox" name="isBlue" value="u" onChange={this.handleChange}></input>
                        <label htmlFor="blueCheckbox" style={{marginRight: '12px', marginLeft: '3px' }}>Blue</label>
                        <input type="checkbox" id="blackCheckbox" name="isBlack" value="b" onChange={this.handleChange}></input>
                        <label htmlFor="blackCheckbox" style={{marginRight: '12px', marginLeft: '3px'}}>Black</label>
                        <input type="checkbox" id="redCheckbox" name="isRed" value="r" onChange={this.handleChange}></input>
                        <label htmlFor="redCheckbox" style={{marginRight: '12px', marginLeft: '3px'}}>Red</label>
                        <input type="checkbox" id="greenCheckbox" name="isGreen" value="g" onChange={this.handleChange}></input>
                        <label htmlFor="greenCheckbox" style={{marginRight: '12px', marginLeft: '3px'}}>Green</label>
                        <select name='colorMatching' value={this.state.colorMatching} onChange={this.handleChange}>
                            <option default value="3D">Exactly these colors</option>
                            <option value="3A">Including these colors</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='rarity' style={{marginRight: '8px'}}>Rarity</label>
                        <select name='rarity' value={this.state.rarity} onChange={this.handleChange}>
                            <option value="" disabled selected>Select rarity</option>
                            <option value="common">Common</option>
                            <option value="uncommon">Uncommon</option>
                            <option value="rare">Rare</option>
                            <option value="mythic">Mythic Rare</option>
                        </select>
                    </div>
                    <div>
                        <select name='statType' value={this.state.statType} onChange={this.handleChange} style={{marginRight: '5px'}}>
                            <option default value="cmc">CMC</option>
                            <option value="pow">Power</option>
                            <option value="tou">Toughness</option>
                            <option value="loy">Loyalty</option>
                        </select>
                        <select name='statMatching' value={this.state.statMatching} onChange={this.handleChange} style={{marginRight: '5px'}}>
                            <option default value="d">Equal to</option>
                            <option value="c">Less than</option>
                            <option value="e">Greater than</option>
                            <option value="c%3d">Less than or equal to</option>
                            <option value="e%3d">Greater than or equal to</option>
                        </select>
                        <input
                            name='statInteger'
                            value={this.state.statInteger}
                            placeholder='Value'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button style={{marginBottom: '10px', marginTop: '5px'}}>Search</button>
                    </div>
                </form>
                <div className={"border rounded container container-flexible justify-content-center"}>
                    {this.state.isCompleted && this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

export default AdvancedSearch

