import React, { Component } from 'react';

class Product extends Component {
//We can use the return value of the playerData.purchase function to create a callback that does 
//something in the console or allows the player get a corresponding message
checkPurchaseAndUpdate = () => {
    let returnValue = this.props.playerData.purchase(this.props.product);

    if(returnValue[1]){
        this.props.updatePlayerState(returnValue[0]);
    }
}
//IE: Thank you, come again - if true => BROKE ALERT - if false
    render(){
        return(
            <li>
                <h2>{this.props.product.name}</h2>
                <h2>{this.props.product.description}</h2>
                <h2>{this.props.product.price}</h2>
                <button onClick={this.checkPurchaseAndUpdate}>Buy</button>
            </li>
        )
    }
}

export default Product;