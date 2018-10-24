import React , { Component } from 'react';
import Product from './Product';
import Option from './Option';
import JobOptions from './JobOptions';

class Interface extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogBox:false,
            dialogContent:null,
        }
    }

    setDialougeBox = (showOrHide,content) => {
        this.setState({dialogContent:content, dialogBox:showOrHide});
    }

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
            {
                this.state.dialogBox?
                this.state.dialogContent:
                null
            }
                <h1>{this.props.storeData.name}</h1>
                <h2 className="store-cash">Cash:{this.props.playerData.money}</h2>
                <ul className="store-list products">
                    {
                    this.props.storeData.isShop ?
                    productList
                     :
                    null
                    }
                </ul>
                <ul className="store-list options">
                    {this.props.storeData.options.map((option,i)=>{
                        return <Option 
                        forceRender = {this.forceRender}
                        updateTime={this.props.updateTime}
                        checkTime={this.props.checkTime}
                        setDialougeBox = {this.setDialougeBox}
                        updatePlayerState = {this.props.updatePlayerState}
                        updateLog = {this.props.updateLog}
                        option={option}
                        key={"option" + i} 
                        />
                    })}
                </ul>
                <JobOptions 
                updateTime={this.props.updateTime}
                checkTime={this.props.checkTime}
                forceRender={this.forceRender}
                storeId={this.props.storeData.id}
                jobData={this.props.jobData}
                playerData={this.props.playerData}
                updatePlayerState={this.props.updatePlayerState}
                setDialougeBox = {this.setDialougeBox}
                />
                <button className="main-button" onClick={()=>{this.props.updateGameState(2)}}>Back</button>
            </div>
            
        )
    }
}

export default Interface;