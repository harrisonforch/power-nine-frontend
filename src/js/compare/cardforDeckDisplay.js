import '../../css/DeckPage.css';
import React from "react";
import requestFromAPI from "../BackendAPI";
import user_logo from "../../static/user-logo.png";
import Badge from 'react-bootstrap/Badge';


//individual card being displayed here -- in its on shell


class CardforDeckDisplay extends React.Component {
    //call function to generate individal cards

    DisplayName(){
        let cardType = this.props.card.type_line;
        if (cardType.includes("land") || cardType.includes("Land")){
            return(<div><h6>
                <Badge class = "Primary" variant="primary">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
        else if ((cardType.includes("Creature") || cardType.includes("creature"))){
            return(<div>
                <h6>
                <Badge class = "Secondary" variant="secondary">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
        else if ((cardType.includes("Enchantment") || cardType.includes("enchantment"))){
            return(<div>
                <h6>
                <Badge class = "Secondary" variant="success">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
        else if ((cardType.includes("artifact") || cardType.includes("Artifact"))){
            return(<div>
                <h6>
                <Badge class = "Secondary" variant="warning">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
        else if ((cardType.includes("Instant") || cardType.includes("instant"))){
            return(<div>
                <h6>
                <Badge class = "Secondary" variant="warning">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
        else if ((cardType.includes("Sorcer") || cardType.includes("sorcer"))){
            return(<div>
                <h6>
                <Badge class = "Secondary" variant="info">{this.props.card.name} </Badge>{' '}
                </h6>
            </div>);
        }
    }
    render() {
        console.log(this.props)
        return (<div classname = "card individual-card card-link container centering">
            {this.DisplayName()}
            <div>
                {this.props.card.layout === 'transform' || this.props.card.layout === 'modal_dfc' || this.props.card.image_uris == null ?
                <img classname = "card-image" src={this.props.card.card_faces[1].image_uris.small}/> :
                <img classname = "card-image" src={this.props.card.image_uris.small}/>}

                
            </div>
            
        </div>);
    }
}
export default CardforDeckDisplay;