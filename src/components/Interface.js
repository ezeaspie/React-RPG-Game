import React , { Component } from 'react';
import Product from './Product';
import Option from './Option';
import JobOptions from './JobOptions';
import Companion from './Companion';

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
        let renderCompanionData = false;
        if(this.props.storeData.id === 401){
            renderCompanionData = true;
        }
        let productList =[];

        if(this.props.storeData.isShop) {
            this.props.storeData.inventory.map((product, i)=>{
                productList.push(
                <Product 
                editAmmo={this.props.editAmmo}
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
                {
                    renderCompanionData?
                    <Companion 
                    playerData={this.props.playerData}
                    />
                    :
                    null
                }
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
                        playerData={this.props.playerData}
                        goToJail = {this.props.goToJail}
                        updateGameState={this.props.updateGameState}
                        forceRender = {this.forceRender}
                        updateTime={this.props.updateTime}
                        checkTime={this.props.checkTime}
                        setDialougeBox = {this.setDialougeBox}
                        updatePlayerState = {this.props.updatePlayerState}
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