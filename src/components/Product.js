import React, { Component } from 'react';

class Product extends Component {
    componentWillReceiveProps({someProp}) {
        this.setState({...this.state,someProp})
      }
//We can use the return value of the playerData.purchase function to create a callback that does 
//something in the console or allows the player get a corresponding message
checkPurchaseAndUpdate = () => {
    let newPlayerObject = this.props.playerData;
    let product = this.props.product;
        if(newPlayerObject.money - product.price >= 0){
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
                <p>{this.props.product.name}</p>
                <p>{this.props.product.description}</p>
                <p>{this.props.product.price}</p>
                <button className="sub-button" onClick={this.checkPurchaseAndUpdate}>Buy</button>
            </li>
        )
    }
}

export default Product;