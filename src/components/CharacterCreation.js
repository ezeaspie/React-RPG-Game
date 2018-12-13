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
            selectedSkin:0,
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
                },
                {
                    name: "Luck",
                    value:4,
                }
            ]
        }
        this.handleSkinClick = this.handleSkinClick.bind(this);
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
            this.props.createPlayer(this.state.nameValue,this.state.stats,this.state.selectedSkin);
        }
    }

    calculateAvaliablePoints = () => {
        let pointsInUse = 0;
        let avaliblePoints = 0;

        this.state.stats.map((stat)=>{pointsInUse += stat.value; return true});
        avaliblePoints = this.state.totalPoints - pointsInUse;

        this.setState({avaliblePoints : avaliblePoints});
    }

    handleName = (e) => {
        this.setState({nameValue : e.target.value},()=>{if(this.state.nameValue.length > 0){this.setState({nameError:false})}});
    }

    updateStat = (newStatObject, id) => {
        let newArray = this.state.stats;
        newArray[id] = newStatObject;
        this.setState({stats : newArray},this.calculateAvaliablePoints());
    }
    handleSkinClick = (e,skinID) => {
        e.preventDefault();
        console.log(skinID);
        this.setState({selectedSkin:skinID});
    }

    render(){
        let skins = [0,1,2,3];
        let styleObject = null;
        if(this.state.nameError){
            styleObject={border:"solid 2px red"}
        }
        return(
            <div className="create-character">
            <form className = "character-form">
                <h1>Create Character</h1>
                <div className='create-main'>
                <ul>
                <label>Name: </label>

                <input type="text" 
                value={this.state.nameValue} 
                style={styleObject}
                onChange={(e) => {this.handleName(e)} } />
                {
                    this.state.stats.map((stat,i)=>{
                        return <StatModifier statData = {stat} currentStatId={i} avaliable = {this.state.avaliblePoints} total={this.state.totalPoints} statId ={i} updateStat = {this.updateStat} key={i} />
                    })
                }
                <p className="points">{this.state.avaliblePoints} Points Avaliable</p>
                </ul>
                <ul className='skin-choice'>
                {
                    skins.map((id)=>{
                        let styles = {
                            backgroundImage:`url('images/other/you${id}.png')`,
                            backgroundSize:"cover",
                        }
                        return <li key={"skin" + id}><button 
                        id={id} 
                        onClick={(e)=>this.handleSkinClick(e,id)} 
                        style={styles}
                        className={this.state.selectedSkin === id?"selected":""}
                        ></button></li>
                    })
                }
                </ul>
                </div>
                <button className="main-button" onClick={(e)=>{this.sendStatObject(e)}}>Create Character ></button>
            </form>
            </div>
        )
    }
}

export default CharacterCreation;