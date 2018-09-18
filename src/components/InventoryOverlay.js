import React, {Component} from 'react';

class InventoryOverlay extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    handleClick = (item,i) => {
        let returnVal = item.effect();
        this.props.handlePlayerInventoryChanges(returnVal[0]);
        console.log(returnVal); 
        this.props.forceRender();
    }

    render(){
        return(
            <ul className="overlay inv-overlay"style={this.props.style} >
                <li><button className="main-button" onClick={() => {this.props.handleClick(false)}}>Back</button></li>
                <div className="inv-overlay-list">
                {this.props.inventoryData.map((item,i)=>{
                    return <li className="inv-item" key={'item'+ i} id={i} onClick={this.handleClick.bind(this,item,i)} 
                    style={{zIndex : "1"}}>
                    <p className="inv-item-title">{item.name}</p>
                    <p>{item.description}</p>
                    </li>
                })}
                </div>  
            </ul>
        )
    }
}

export default InventoryOverlay;