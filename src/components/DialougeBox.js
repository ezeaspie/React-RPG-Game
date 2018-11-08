import React, { Component } from 'react';

class DialougeBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialougeOption : 0,
        }
    }

handlePlayerChoice = (choiceObject) => {
    let returnVal = choiceObject.effect();
    if(returnVal===false){
        this.props.exitDialouge();
        return;
    }
    this.setState({dialougeOption: returnVal});
    console.log(returnVal);
}
    render(){
        let npc = this.props.npc;
        let dialougeIndex = this.state.dialougeOption;
        return(
        <div className="dialouge-box">
            <p className="npc-name">{npc.name}</p>
        <div className="npc-dialouge">
            <p>{npc.dialouge[dialougeIndex].message}</p>
        </div>
        <ul className="player-options">
        {
          npc.dialouge[dialougeIndex].options.map((choice,i)=> {
            return <li 
            key={"choice"+i} 
            style={npc.dialouge[dialougeIndex].options[i].check()?null:{display:"none"}}
            className="player-choice"
            onClick= {()=>{this.handlePlayerChoice(choice)}}
            >{choice.name}</li>
          })
        }
      </ul>
      </div>
        )
    }
}

export default DialougeBox;