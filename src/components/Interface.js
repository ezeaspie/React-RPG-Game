import React , { Component } from 'react';
import Product from './Product';
import Option from './Option';

class Interface extends Component {

    forceRender = () => {
        this.forceUpdate();
    }

    render(){
        let productList =[];

        if(this.props.storeData.isShop) {
            this.props.storeData.inventory.map((product, i)=>{
                productList.push(
                <Product 
                forceRender = {this.forceRender}
                updatePlayerState = {this.props.updatePlayerState}
                playerData = {this.props.playerData} 
                product={product} 
                key={"product-" + i}/>);
            })
        } 
        return(
            <div className="store">
                <h1>{this.props.storeData.name}</h1>
                <h2>Cash:{this.props.playerData.money}</h2>
                <ul>
                    {
                    this.props.storeData.isShop ?
                    productList
                     :
                    <li>Mo Salah is overrated bc he plays for loserpool.</li>
                    }
                </ul>
                <ul>
                    {this.props.storeData.options.map((option,i)=>{
                        return <Option
                        updatePlayerState = {this.props.updatePlayerState}
                        option={option}
                        key={"option" + i} 
                        />
                    })}
                </ul>
                <button onClick={()=>{this.props.updateGameState(2)}}>Back</button>
            </div>
            
        )
    }
}

export default Interface;