import React, {Component} from 'react';

class StatsOverlay extends Component {
    render(){
        return(
            <ul className="overlay stats-overlay" style={this.props.style} onClick={() => {this.props.handleClick(true)}}>
                {this.props.stats.map((stat,i)=>{
                    return <li key={"stat" + i}>
                    <p>{stat.name}</p>
                    <p>{stat.value}</p>
                    </li>
                })}
                <li key={"streetCred"}><p>StreetCred</p><p>{this.props.player.streetCred}</p></li>
            </ul>
        )
    }
}

export default StatsOverlay;