import React, {Component} from 'react';

class SkinInterface extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSkin : 0,
        }
    }

    componentWillMount () {
        this.setState({selectedSkin:this.props.playerData.skin});
    }

    handleSkinClick = (e,skinID) => {
        e.preventDefault();
        console.log(skinID);
        this.setState({selectedSkin:skinID},()=>{
            let player = this.props.playerData;
            player.skin = this.state.selectedSkin;
            this.updatePlayerState(player);
        });
    }

    render(){
        let skins = this.props.playerData.skinCollection;

        return(
            <div>
                <h2>Change Appearance</h2>
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
        )
    }
}

export default SkinInterface;