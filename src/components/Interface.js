import React , { Component } from 'react';
import Product from './Product';

class Interface extends Component {

    updatePlayer = (stats = this.props.playerData.stats,inv = this.props.playerData.inventory,money =this.props.playerData.money ,health = this.props.playerData.health ,maxHealth = this.props.playerData.maxHealth) => {
        let newObject = {name: this.props.playerData.name, stats, inventory:inv,money,health,maxHealth}    
        console.log(newObject);
    }

    render(){
        let productList =[];

        if(this.props.storeData.isShop) {
            this.props.storeData.inventory.map((product, i)=>{
                productList.push(<Product playerData = {this.props.playerData} product={product} key={"product-" + i}/>);
            })
        } 
        return(
            <div className="store">
                <h1>{this.props.storeData.name}</h1>
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
                        return <li 
                        key={"option" + i} 
                        onClick={()=>{option.effect()}}>
                        {option.name}
                        </li>
                    })}
                </ul>
                <button onClick={()=>{this.props.updateGameState(2)}}>Back</button>
            </div>
            
        )
    }
}

export default Interface;