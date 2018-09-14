import React , { Component } from 'react';
import StatModifier from './StatModifier';

class CharacterCreation extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameError: false,
            nameValue : '',
            avaliblePoints: 0,
            totalPoints: 25,
            stats : [
                {
                    name: "Charisma",
                    value:3,
                },
                {
                    name: "Strength",
                    value:4,
                },
                {
                    name: "Intelligence",
                    value:5,
                },
                {
                    name: "Agility",
                    value:2,
                }
            ]
        }
    }

    componentWillMount(){
        this.calculateAvaliablePoints();
    }

    sendStatObject = (e) => {
        e.preventDefault();
        if(this.state.nameValue.length === 0){
            this.setState({nameError:true});
        }
        else{
            this.props.createPlayer(this.state.nameValue,this.state.stats);
        }
    }

    calculateAvaliablePoints = () => {
        let pointsInUse = 0;
        let avaliblePoints = 0;

        this.state.stats.map((stat)=>{pointsInUse += stat.value});
        avaliblePoints = this.state.totalPoints - pointsInUse;

        this.setState({avaliblePoints : avaliblePoints});
    }

    handleName = (e) => {
        this.setState({nameValue : e.target.value},()=>{if(this.state.nameValue.length > 0){this.setState({nameError:false})}});
    }

    updateStat = (newStatObject, id) => {
        let newArray = this.state.stats;
        newArray[id] = newStatObject;
        console.log(newArray[id]);
        this.setState({stats : newArray},this.calculateAvaliablePoints());
    }
    render(){
        let styleObject = null;
        if(this.state.nameError){
            styleObject={border:"solid 2px red"}
        }
        return(
            <div className="create-character">
            <form className = "character-form">
                <h2>Create Character</h2>
                <label>Name: </label>

                <input type="text" 
                value={this.state.nameValue} 
                style={styleObject}
                onChange={(e) => {this.handleName(e)} } />

                {
                    this.state.stats.map((stat,i)=>{
                        return <StatModifier statData = {stat} avaliable = {this.state.avaliblePoints} total={this.state.totalPoints} statId ={i} updateStat = {this.updateStat} key={i} />
                    })
                }
                <h3>{this.state.avaliblePoints} Points Avaliable</h3>
                <button onClick={(e)=>{this.sendStatObject(e)}}>Go</button>
            </form>
            </div>
        )
    }
}

export default CharacterCreation;