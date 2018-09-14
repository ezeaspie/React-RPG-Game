import React, {Component} from 'react';

class StatsOverlay extends Component {
    render(){
        return(
            <ul style={this.props.style} onClick={() => {this.props.handleClick(true)}}>
                {this.props.stats.map((stat,i)=>{
                    return <li key={"stat" + i}>
                    <p>{stat.name}</p>
                    <p>{stat.value}</p>
                    </li>
                })}
            </ul>
        )
    }
}

export default StatsOverlay;