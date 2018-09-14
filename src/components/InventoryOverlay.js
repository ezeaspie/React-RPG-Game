import React, {Component} from 'react';

class InventoryOverlay extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    handleClick = (item,i) => {
        let returnVal = item.effect();
        this.props.handlePlayerInventoryChanges(returnVal[0][0]);
        console.log(returnVal); 
    }

    render(){
        return(
            <ul style={this.props.style} >
                <li><button onClick={() => {this.props.handleClick(false)}}>Back</button></li>
                {this.props.inventoryData.map((item,i)=>{
                    return <li key={'item'+ i} id={i} onClick={this.handleClick.bind(this,item,i)} 
                    style={{zIndex : "1"}}>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    </li>
                })}
            </ul>
        )
    }
}

export default InventoryOverlay;