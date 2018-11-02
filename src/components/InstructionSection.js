import React, { Component } from 'react';

class InstructionSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: undefined,
        }
    }

    componentWillMount(){
        this.setState({isOpen:this.props.isOpen});
    }

    toggleState = () => {
        if(this.state.isOpen){
            this.setState({isOpen:false});
        }
        else{
            this.setState({isOpen:true});
        }
    }

    render(){
        let collapsedStyle = {
            maxHeight:'0',
            transition: 'max-height 0.15s ease-out',
            overflow: 'hidden',
        }

        let uncollapsedStyle = {
            maxHeight:'500px',
            transition: 'max-height 0.15s ease-out',
        }

        return (
            <li>
                <h2 onClick={this.toggleState}>{this.props.data.name}</h2>
                <div className="content-wrapper"
                style={this.state.isOpen?uncollapsedStyle:collapsedStyle}>
                {this.props.data.content}
                </div>
            </li>
        )
    }
}

export default InstructionSection;