import React, {Component} from 'react';

class JobOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobContent:null,
            hasJob:false,
            playerJobData:undefined,
        }
        this.handleGetJob = this.handleGetJob.bind(this);
        this.handleWorkShift = this.handleWorkShift.bind(this);
        
    }

    componentWillMount(){
        this.buildContent();
    }

    handleWorkShift = (promotionLevel = 0) => {
        let player = this.props.playerData;
        let shiftTime = this.props.jobData.shiftTime;

        if(this.props.checkTime(shiftTime)){
            let pay = shiftTime * this.props.jobData.promotion[promotionLevel].pay;

            player.money += pay;
            this.props.updatePlayerState(player);
            this.props.updateTime(false,shiftTime);
            this.props.forceRender();  
            return; 
        }
            console.log("Too late in the day."); 
    }

    buildWorkContent () {
        //let player = this.props.playerData;
        let promotionLevel = this.state.playerJobData.promotion;
        let jobData = this.props.jobData;
        
        let content=
        <div onClick={()=>{this.handleWorkShift(promotionLevel)}}>
            <p>Work</p>
            <p>{jobData.promotion[promotionLevel].name}</p>
            <p>{jobData.promotion[promotionLevel].pay}</p>
        </div>

        if(jobData.promotion[promotionLevel+1] !== undefined){
            //return something.
            //calculate requirements. 
            let requirements = jobData.requirements.filter(requirement => requirement.value > 0);
            requirements.forEach(requirement => {
                let multiplier = promotionLevel + 1;
                requirement.value += jobData.increment * multiplier;
            });

            content = 
            <div>
                <div onClick={()=>{this.handleWorkShift(promotionLevel)}}>
                    <p>Work</p>
                    <p>{jobData.promotion[promotionLevel].name}</p>
                    <p>{jobData.promotion[promotionLevel].pay}</p>
                </div>
                <div>
                    <p>Ask for promotion</p>
                    <p>{jobData.promotion[promotionLevel+1].name}</p>
                    {
                        requirements.map((requirement)=>{
                            return(
                            <p>
                                <span>{requirement.name}</span>
                                <span>{requirement.value}</span>
                            </p>
                            )
                        })
                    }
                </div>
            </div>
        }
        return content;
        //check for promotion.
        //this.setState({jobContent:content});
    }

    checkRequirements = (hasJob = false) => {
        let jobRequirements = this.props.jobData.requirements;
        let playerStats = this.props.playerData.stats;
        playerStats.push({name:"Street Cred", value:this.props.playerData.streetCred});
        playerStats.push({name:"Money", value: this.props.playerData.money});

        let isEqual = () => {
            let checkArray = jobRequirements.map((requirement,i)=>{
                return playerStats[i].value >= requirement.value;
            });
            return checkArray.every((requirementMet)=>{return requirementMet});
        }
        return isEqual();
    }

    handleGetJob(){
        let player= this.props.playerData;
        if(this.checkRequirements()){
            let newJob = {
                id: this.props.jobData.id,
                promotion: 0,
            }
            if(player.jobs.every(job => {return job.id !== newJob.id})){
                player.jobs.push(newJob);
                this.props.updatePlayerState(player);
                let jobOb = player.jobs.filter(job => {return job.id === newJob.id});
                this.setState({playerJobData: jobOb[0], hasJob:true});
                //create new button
            }
            else{
                console.log("You already have a job here.");
            }
        }else{
            console.log("You do not meet the requirements to get a job here.");
        }
        
    }

    buildContent(){
        if(this.props.jobData === undefined){
            return null;
        }
        let playerJob = this.props.playerData.jobs.filter(job => this.props.jobData.id === this.props.storeId)
        if(playerJob[0] !== undefined){
            this.setState({hasJob:true});
            //print WORK.
            //check for promotions
            return;
        }
        let requirements = this.props.jobData.requirements.filter(requirement => requirement.value > 0);
        let content=
            <div className="" onClick={this.handleGetJob}>
            <p>Get a job</p>
            <p>{this.props.jobData.name}</p>
            {requirements.map((requirement)=>{
                return <p key={"job"+requirement.name}><span>{requirement.name}</span><span>{requirement.value}</span></p>
            })}
            </div>
            //this.setState({jobContent:content});
        return content
    }
    render(){
        let content = undefined;

        if(!this.state.hasJob){
            content = this.buildContent();
        }
        else{
            content = this.buildWorkContent();
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default JobOptions;