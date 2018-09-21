import React, { Component } from 'react';
import mapData from '../gameAssets/mapData';

//ADD A METHOD THAT UPDATES PARENT POSITION STATE WHEN ENTERING A SHOP OR SAVING

class MapUI extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPosition : 0,
        }
        this.handleMovement = this.handleMovement.bind(this);
    }

    handleMovement = (event) => {
        let positionY = this.state.currentPosition[0];
        let positionX = this.state.currentPosition[1];

        let oldPositionY = "" + this.state.currentPosition[0];
        let oldPositionX = "" + this.state.currentPosition[1];
        let oldPositionYNum = this.state.currentPosition[0];
        let oldPositionXNum = this.state.currentPosition[1];

        if(oldPositionX < 10) {
            oldPositionX = "0" + oldPositionX;
        }
        if(oldPositionY < 10){
            oldPositionY = "0" + oldPositionY;
        }

        //Check for offScreen position
        let key=event.key;
        if (key === 'ArrowUp') {
            if(positionY - 1 > -1){
                positionY--;
            }
        }
        if (key === 'ArrowDown') {
            if(positionY + 1 < 20){
                positionY++;
            }
        }
        if (key === 'ArrowLeft') {
            if (positionX - 1 > -1) {
                positionX--;
            }
        }
        if (key === 'ArrowRight') {
            if (positionX + 1 < 20) {
                positionX++;
            }
        }
        let xID = "" + positionX;
        let yID = "" + positionY;
        if(positionX < 10) {
            xID = "0" + positionX;
        }
        if(positionY < 10){
            yID = "0" + positionY;
        }
        console.log(yID+xID);


        //Check for invalid or action tiles
        if (mapData[this.props.mapId].layout[positionY][positionX] > 400 ) {
            //Find which 'shop' to show. Use the tile value.
            let storeId = mapData[this.props.mapId].layout[positionY][positionX];
            //Render that shop.
            this.props.renderStoreInterface(storeId);
            return;
        }
        else if(mapData[this.props.mapId].layout[positionY][positionX] > 200 ){
            return;
    }
        //Execute function to update upper state.
        let newPosition = [positionY, positionX];
        document.getElementById(yID+xID).style.background = "#000";
        document.getElementById(oldPositionY + oldPositionX).style.background = `url(./images/mapTiles/${mapData[this.props.mapId].layout[oldPositionYNum][oldPositionXNum]}.png)`;
        console.log(mapData[this.props.mapId].layout[oldPositionYNum][oldPositionXNum]);

        this.setState({currentPosition:newPosition});
    }

    componentWillMount(){
        this.setState({currentPosition: this.props.playerPosition});
        window.addEventListener('keydown', this.handleMovement);
    }
   
     componentWillUnmount() {
        window.removeEventListener('keydown', this.handleMovement);
     }

    createCellRow = (cellArray,rowId) => {
        let playerPositionStyle = {
            background:'#000',
        }

        let cells = [];
        cellArray.map((cell,cellId) => {
            let cellStyle={
                background: `url(./images/mapTiles/${cell}.png`,
            }
            let tempRow = rowId;
            let tempCell = cellId;

            if(rowId < 10){
                tempRow = "0" + rowId;
            }
            if(cellId < 10){
                tempCell = "0" + cellId;
            }
            let newCell = 
            <div 
            id={tempRow.toString() + tempCell.toString()}
            key={tempRow.toString() + tempCell.toString()}
            className="cell" 
             style={cellStyle}></div>
            if(rowId === this.props.playerPosition[0] && cellId === this.props.playerPosition[1]){
                newCell = <div
                id={tempRow.toString() + tempCell.toString()}
                key={tempRow.toString() + tempCell.toString()} 
                className="cell" 
                style={playerPositionStyle}></div>
            }
            cells.push(newCell)
            return true;
        })

        return cells;
    }

    render() {
        return(
            <div className="map">
                {
                    mapData[this.props.mapId].layout.map((row,i) => {

                        return (
                            <div className="row" key={'row' + i}>
                            {this.createCellRow(row,i)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default MapUI;