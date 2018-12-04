import React, {Component} from 'react';
import InventoryItem from './InventoryItem';
import Weapons from '../gameAssets/weapons';

class InventoryOverlay extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeItem:undefined,
            weaponList:this.props.playerData.activeWeapons,
        }
        this.onClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setDefaultState();
    }

    setDefaultState = () => {
        let item = {
            name:"Select an item",
            id:undefined,
            description: <div><p>Item info will appear here.</p></div>,
            price: undefined,
            isConsumable:false,
        }
        this.setState({activeItem:item});
    }

    handleClick = () => {
        if(this.state.activeItem.isConsumable){
            //get the item object and run it's effect. Might be easier to just set the state to the entire item object instead of splitting it up like it is now.
            this.props.removeInventoryItem(this.state.activeItem.id);
            let returnVal = this.state.activeItem.effect();
            this.props.updatePlayerState(returnVal);
            this.setDefaultState();
        }
        return;
    }

    updateConsole = (itemObject) => {
        this.setState({activeItem:itemObject},()=>{
            console.log(this.state.activeItem.isWeapon);
        });
    }

    removeItem = (index) => {
        let player = this.props.playerData;
        player.activeWeapons.splice(index,1);
        this.setState({weaponList:player.activeWeapons},()=>{this.props.removeWeapon(index)});
    //Add remove ITem code. Ensure that the indexes update after removing or it will remove wrong ones after the first removal
    }

    equipItem = () => {
        let id = Number(this.state.activeItem.id);
        let player = this.props.playerData;

        let check = player.activeWeapons.filter((weaponId)=>{
            return this.state.activeItem.id === weaponId;
        });

        if(check[0] !== undefined){
            return;
        }
        
        if(player.activeWeapons.length > 3){
            player.activeWeapons.pop();
        }

        player.activeWeapons.unshift(id);
        console.log(player.activeWeapons);
        this.setState({weaponList:player.activeWeapons},()=>{this.props.equipWeapon(this.state.activeItem)});

    }

    render(){
        return(
            <div className="overlay inv-overlay"style={this.props.style} >
                <button className="main-button" onClick={() => {this.props.handleClick(false)}}>Back</button>
                <div className="inv-overlay-main">
                    <ul className="inv-overlay-list">
                    {this.props.inventoryData.map((item,i)=>{
                        return(
                        <InventoryItem
                            key={item.id + i}
                            item={item}
                            index={i}
                            updateConsole={this.updateConsole}
                        /> 
                        )
                    })}
                    </ul>
                    <div className="inv-console">
                        <div className="inv-console-dynamic">
                            <div className="inv-console-image">
                            </div>
                            <h2 className="inv-console-title">
                                {this.state.activeItem.name}
                            </h2>
                            <div className="inv-console-description">
                                {this.state.activeItem.description}
                            </div>
                            <button disabled={!this.state.activeItem.isConsumable} onClick ={this.handleClick} className="main-button">Use</button>
                            <button disabled={!this.state.activeItem.isWeapon?true:false} className="main-button" onClick={this.equipItem}>Equip</button>
                        </div>
                        <div className="inv-console-equipment">
                            <ul>
                                {
                                    this.state.weaponList.map((weaponId,i)=>{
                                        let selectedWeapon = Weapons.filter((weapon)=>{
                                            return weapon.id === weaponId;
                                        });
                                        let weaponObject = selectedWeapon[0];
                                        return <li><p>{weaponObject.name}</p><button onClick={()=>{this.removeItem(i)}}>Remove</button></li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InventoryOverlay;