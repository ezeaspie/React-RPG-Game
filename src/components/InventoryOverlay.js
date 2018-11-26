import React, {Component} from 'react';
import InventoryItem from './InventoryItem';

class InventoryOverlay extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeItem:undefined,
        }
        this.onClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setDefaultState();
    }

    setDefaultState = () => {
        let item = {
            name:"Select an item",
            id:undefined,
            description: <div><p>Item info will appear here.</p></div>,
            price: undefined,
            isConsumable:false,
        }
        this.setState({activeItem:item});
    }

    handleClick = () => {
        if(this.state.activeItem.isConsumable){
            //get the item object and run it's effect. Might be easier to just set the state to the entire item object instead of splitting it up like it is now.
            this.props.removeInventoryItem(this.state.activeItem.id);
            let returnVal = this.state.activeItem.effect();
            this.props.updatePlayerState(returnVal);
            this.setDefaultState();
        }
        return;
    }

    updateConsole = (itemObject) => {
        this.setState({activeItem:itemObject});
    }

    render(){
        return(
            <div className="overlay inv-overlay"style={this.props.style} >
                <button className="main-button" onClick={() => {this.props.handleClick(false)}}>Back</button>
                <ul className="inv-overlay-list">
                {this.props.inventoryData.map((item,i)=>{
                    return(
                    <InventoryItem
                        key={item.id}
                        item={item}
                        index={i}
                        updateConsole={this.updateConsole}
                    /> 
                    )
                })}
                </ul>
                <div className="inv-console">
                    <div className="inv-console-image">
                    </div>
                    <h2 className="inv-console-title">
                        {this.state.activeItem.name}
                    </h2>
                    <div className="inv-console-description">
                        {this.state.activeItem.description}
                    </div>
                    <button disabled={!this.state.activeItem.isConsumable} onClick ={this.handleClick} className="main-button">Use</button>
                </div>  
            </div>
        )
    }
}

export default InventoryOverlay;