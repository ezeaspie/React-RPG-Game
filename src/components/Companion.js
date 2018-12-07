import React, {Component} from 'react';
import companions from '../gameAssets/companionData';

class Companion extends Component {
    constructor(props){
        super(props);
        this.state = {
            lol:0,
        }
    }

    render(){
        let companion = companions[this.props.playerData.companion];
        return(
            companion===undefined?
            null:
            <div className="companion">
                <img alt="companion gif" src={companion.image}></img>
                <li>Talk to {companion.name}</li>
            </div>
        )
    }
}
export default Companion;