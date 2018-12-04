import React, { Component } from 'react';

class InventoryItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInfoVisible:false,
        }
    }
    componentWillReceiveProps({someProp}) {
        this.setState({...this.state,someProp})
      }

checkPurchaseAndUpdate = () => {
    let newPlayerObject = this.props.playerData;
    let product = this.props.product;
    let registerSound = new Audio('././audio/effects/cashRegister.mp3');
        if(newPlayerObject.money - product.price >= 0){
          registerSound.play();  
          newPlayerObject.money -= product.price;
          newPlayerObject.inventory.push(product);
          let logMessage = `Purchased ${product.name} for ${product.price}`;
          this.props.updateLog(logMessage);
          this.props.updatePlayerState(newPlayerObject);
          this.props.forceRender();
        }
}

handleClick = () => {
    this.props.updateConsole(this.props.item);
}
    render(){
        return(
            <li 
            className="inv-item" 
            key={this.props.item.id} 
            style={{zIndex :"1"}}
            onClick={this.handleClick}
            >
                <h3>{this.props.item.name}</h3>
                <div className="product-description" 
                style={this.state.isInfoVisible?{opacity:"1",transition:"ease .3s opacity",zIndex:99}:{opacity:"0",transition:"ease .3s opacity",zIndex:-99}}>
                    {this.props.item.description}
                </div>
            </li>
        )
    }
}

export default InventoryItem;