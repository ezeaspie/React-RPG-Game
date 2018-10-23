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

    handleAskForPromotion = () => {
        if(this.checkRequirements(true)){
            let player = this.props.playerData;
            let storeId = this.props.storeId;
            let promotionLevel = player.jobs.filter((job)=>{return storeId === job.id});
            promotionLevel = promotionLevel[0];
            promotionLevel.promotion++;
            this.props.updatePlayerState(player);
            this.forceUpdate();
        }
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
        <li className="option" onClick={()=>{this.handleWorkShift(promotionLevel)}}>
            <p>Work</p>
            <p>{jobData.promotion[promotionLevel].name}</p>
            <p>{jobData.promotion[promotionLevel].pay}</p>
        </li>

        if(jobData.promotion[promotionLevel+1] !== undefined){
            //return something.
            //calculate requirements. 
            let jobRequirements = jobData.requirements.filter(requirement => requirement.value > 0);
            jobRequirements.forEach(requirement => {
                if(requirement.value === 0){
                    requirement.value = 0;
                    return;
                }
                let base = this.props.jobData.increment;

                let multiplier = promotionLevel + 1;

                requirement.value = base * multiplier;
                requirement.value += base;
            });

            content = 
            <div>
                <li className="option" onClick={()=>{this.handleWorkShift(promotionLevel)}}>
                    <p>Work</p>
                    <p>{jobData.promotion[promotionLevel].name}</p>
                    <p>{jobData.promotion[promotionLevel].pay}</p>
                </li>
                <li className="option" onClick={this.handleAskForPromotion}>
                    <p>Ask for promotion</p>
                    <p>{jobData.promotion[promotionLevel+1].name}</p>
                    {
                        jobRequirements.map((requirement)=>{
                            return(
                            <p>
                                <span>{requirement.name}</span>
                                <span>{requirement.value}</span>
                            </p>
                            )
                        })
                    }
                </li>
            </div>
        }
        return content;
        //check for promotion.
        //this.setState({jobContent:content});
    }

    checkRequirements = (hasJob = false) => {
        let jobRequirements = this.props.jobData.requirements;
        if(hasJob){
            //do promotions req check.
            let storeId = this.props.storeId;
            let promotionLevel = this.props.playerData.jobs.filter((job)=>{return job.id === storeId});
            console.log(this.props.playerData.jobs, storeId);
            promotionLevel = promotionLevel[0].promotion;

            jobRequirements.forEach(requirement => {
                if(requirement.value === 0){
                    requirement.value = 0;
                    return;
                }
                let base = this.props.jobData.increment;

                let multiplier = promotionLevel + 1;

                requirement.value = base * multiplier;
                requirement.value += base;
            });
        }
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
            console.log("no for this place found");
            return null;
        }
        let playerJob = this.props.playerData.jobs.filter(job => this.props.jobData.id === this.props.storeId)
        if(playerJob[0] !== undefined){
            this.setState({hasJob:true, playerJobData:playerJob[0]});
            return;
        }
        let requirements = this.props.jobData.requirements.filter(requirement => requirement.value > 0);
        let content=
            <div className="option" onClick={this.handleGetJob}>
            <p>Get a job</p>
            <p>{this.props.jobData.name}</p>
            {requirements.map((requirement)=>{
                return <p key={"job"+requirement.name}><span>{requirement.name}</span><span> {requirement.value}</span></p>
            })}
            </div>
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