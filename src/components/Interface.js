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
                updateLog={this.props.updateLog}
                forceRender = {this.forceRender}
                updatePlayerState = {this.props.updatePlayerState}
                playerData = {this.props.playerData} 
                product={product} 
                key={"product-" + i}/>);
                return true;
            })
        } 
        return(
            <div className="store">
                <h1>{this.props.storeData.name}</h1>
                <h2 className="store-cash">Cash:{this.props.playerData.money}</h2>
                <ul className="store-list products">
                    {
                    this.props.storeData.isShop ?
                    productList
                     :
                    <li>loserpool is overrated.</li>
                    }
                </ul>
                <ul className="store-list options">
                    {this.props.storeData.options.map((option,i)=>{
                        return <Option
                        updatePlayerState = {this.props.updatePlayerState}
                        updateLog = {this.props.updateLog}
                        option={option}
                        key={"option" + i} 
                        />
                    })}
                </ul>
                {this.props.jobOptions}
                <button className="main-button" onClick={()=>{this.props.updateGameState(2)}}>Back</button>
            </div>
            
        )
    }
}

export default Interface;