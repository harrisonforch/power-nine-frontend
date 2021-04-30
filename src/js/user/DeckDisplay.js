import React from "react";
import {Link} from "react-router-dom";

class DeckDisplay extends React.Component {
    render() {
        let idxOfImage = -1;
        for (let i = 0; i < this.props.deck.cards.length; i++) {
            let card = this.props.deck.cards[i];
            if (card.image_uris !== undefined && card.image_uris.art_crop !== undefined) {
                idxOfImage = i;
                break;
            }
        }
        return <Link to={{
            pathname: "/deck",
            state: {
                deck: this.props.deck
            }
        }}>
            <div className={"card page-link"}>
                {idxOfImage !== -1 ?
                    <img className={"card-img-top"} src={this.props.deck.cards[idxOfImage].image_uris.art_crop}  alt="Card in deck" /> :
                    <img alt={"No cards stored!"} />
                }

                <div className={"card-body"}>
                    <h5 className={"card-title deck-card-display"}>{this.props.deck.deckName}</h5>
                    <p className={"card-subtitle deck-card-display"}>
                        Number of cards in deck: {this.props.deck.cards.length}
                    </p> <br/>
                    <p className={"card-subtitle deck-card-display"}>
                        Average rating: {this.props.rating}
                    </p>
                </div>
            </div>
        </Link>
    }
}
export default DeckDisplay;