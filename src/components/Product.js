import React, { Component } from 'react';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInfoVisible:false,
        }
    }
    componentWillReceiveProps({someProp}) {
        this.setState({...this.state,someProp})
      }
//We can use the return value of the playerData.purchase function to create a callback that does 
//something in the console or allows the player get a corresponding message
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
//IE: Thank you, come again - if true => BROKE ALERT - if false
    render(){
        return(
            <li className="product">
                <h3>{this.props.product.name} 
                <span 
                onMouseOver={()=>{this.setState({isInfoVisible:true})}}
                onMouseOut={()=>{this.setState({isInfoVisible:false})}}
                className="about"> ?</span>
                </h3>
                <div className="product-description" 
                style={this.state.isInfoVisible?{opacity:"1",transition:"ease .3s opacity",zIndex:99}:{opacity:"0",transition:"ease .3s opacity",zIndex:-99}}>
                    {this.props.product.description}
                </div>
                <p>$ {this.props.product.price}</p>
                <button className="sub-button" onClick={this.checkPurchaseAndUpdate}>Buy</button>
            </li>
        )
    }
}

export default Product;