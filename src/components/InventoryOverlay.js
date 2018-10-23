import React, {Component} from 'react';

class InventoryOverlay extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    handleClick = (item,i) => {
        console.log(item, i);
        console.log(item.effect);
        if(item.effect === undefined){
            let newItem = this.props.consumableItems.filter((baseItem)=>{return item.id === baseItem.id});
            item = newItem[0];
            console.log(item);
        }
        if(item.isConsumable){
            let player = this.props.playerData;
            let returnVal = item.effect();
            console.log(returnVal);
            let handleConsumable = () => {
                player.inventory.splice(i,1);
            }
            handleConsumable();
            this.props.updatePlayerState(returnVal);
            this.props.forceRender();
            console.log(item);
        }
        return;
    }

    render(){
        return(
            <ul className="overlay inv-overlay"style={this.props.style} >
                <li><button className="main-button" onClick={() => {this.props.handleClick(false)}}>Back</button></li>
                <div className="inv-overlay-list">
                {this.props.inventoryData.map((item,i)=>{
                    return <li className="inv-item" key={'item'+ i} id={i} onClick={this.handleClick.bind(this,item,i)} 
                    style={{zIndex : "1"}}>
                    <p className="inv-item-title">{item.name}</p>
                    <p>{item.description}</p>
                    </li>
                })}
                </div>  
            </ul>
        )
    }
}

export default InventoryOverlay;