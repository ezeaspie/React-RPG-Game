import React, { Component } from 'react';
import InstructionSection from './InstructionSection';

class Instructions extends Component {
    render(){
        let InstructionData = [
            {
                name:'General',
                content:
                <div className="content">
                    <p>Cube RPG is a browser game where you get to decide what to do in this weird little town.</p>
                    <p>Create a character and choose how much you put into certain stats. Each stat affects a different element of gameplay. Strength for when you need to teach some street scum a lesson, intelligence for getting that cushy CEO job, or luck... to help you in just about everything!</p>
                    <p>Move around the map with the arrow keys or WASD keys. Enter shops or buildings. Each place you go to will have different inventory or options! Go to school and study to boost your intelligence... or purchase some beer at the bar to up your charisma.</p>
                    <p>Some shops have jobs avaliable for you - if you meet the requirements! Once you get your foot in the door, work your job for money, or ask for that promotion if you have the stats!</p>
                    <p>Interact with others and explore what this strange world has to offer! Click on a topic below to learn more about it or press back to return to the main menu to start making your character!</p>
                </div>
            },
            {
                name:'Stats',
                content:
                <div className='content'>
                    <p>Each stat controls something within the game and affects outcomes of your actions.</p>
                    <p><b>Charisma</b> affects your ability to succeed in personal interactions with NPCS in the street, to talk your way out of jail, or to get a job as a public speaker or teacher.</p>
                    <p><b>Strength</b> affects how much damage you do in combat with both melee and ranged weapons. This also affects your chances of a successful robbery.</p>
                    <p><b>Intelligence</b> only affects your ability to hide commodities in jail right now.</p>
                    <p><b>Agility</b> affects your attack points avaliable in combat. Every attack costs some attack points and the higher your agility, the more attacks you get per turn! Also affects your robbery chances.</p>
                    <p><b>Luck</b> affects... just about everything. Having that extra bit of luck could land you that critical in combat, make an unsuccesful robbery actually work, or convince a person to do something they don't want to!</p>
                    <p><b>StreetCred</b> is hard to level up, but a high StreetCred will gain you respect in the streets, unlocking new jobs, places, and getting you special treatment in certain circles. A low StreetCred will get you respect... but within a completley different group of people.</p>
                </div>
            },
            {
                name:'The Console',
                content:
                <div className="content">
                    <p>Your <b>console</b> is a sort of HUD, which tells you some important data about yourself like health, current time and day, and the amount of cash you have on you.</p>
                    <p>The console also allows you to access your inventory, check your game and player stats, as well as save!</p>
                </div>
            },
            {
                name:'Time and Actions',
                content: 
                <div className="content">
                    <p>Almost everything you do will take time. Whether you want to fight someone in the bar, go to a physics lecture, or work your menial jobs - you won't be able to do it if it's too late in the day.</p>
                    <p>Keep track of the time in your console. Once it reaches midnight, you will need to sleep in order to reset the clock and go again! Every time you sleep you restore some health and advance a day.</p>
                </div>
            },
            {
                name:'Jobs',
                content:
                <div className="content">
                    <p>Some stores will show you an option to <b>Get a job</b>. The option will show a title and the job requirements needed to get a job. If you meet the requirements: Congratulations! You're hired!</p>
                    <p>Once you have a job, you have the option of working a shift at your new job or working towards a promotion for a bigger salary! A promotion for the most part will require you to get even higher stats so make sure you have enough to succeed!</p>
                </div>
            },
            {
                name:'Combat',
                content:
                <div className="content">
                    <p>Sometimes people will want to fight you. Sometimes you will want to fight people. When this happens - you are taken to the combat interface.</p>
                    <p>Combat is turn based. Whoever has the higher agility stat will attack first.</p>
                    <p>Every weapon in your and your opponent's inventory will appear on your respective sides. Each weapon will show the damage it will do with your strength and other buffs taken into account, as well as the attack point cost to use that weapon.</p>
                    <p>If you have enough attack points to use a chosen weapon, you will attack. Sometimes a critical hit will double your damage - but it all comes down to luck as to whether you land a critical or not.</p>
                    <p>Once you have 0 attack points or can't use any weapons - you can choose to pass or the opponent will automatically take their turn.</p>
                    <p>If you find some situations, you will be able to <b>Chump Out</b> which will let you escape from the battle at the cost of some money and StreetCred. This option is disabled in some situations so make sure you know what you're getting into!</p>
                    <p>The battle ends when you flee or when someone's health reaches 0. If you win, you get money and StreetCred! If you lose... just start from your last save and pretend you never died!</p>
                </div>
            },
            {
                name:"Jail",
                content:
                <div className="content">
                    <p>You got arrested! Now what? When you get caught doing something bad, you get arrested and sent to jail.</p>
                    <p>In jail you have a few options on how to get out... or make a bit of money for your time.</p>
                    <p>If you just want to get out, click the 'Wait out your sentence' button and you will advance 7 days and get out!</p>
                    <p>If you have any sort of alcohol or drugs on you, you have an oppurtunity to sell them for 1.5x what you bought them for! However, there is a chance you get caught and have your items confiscated by the guards. To increase your chances of a successful sale - make sure you invest in Charisma and Intelligence!</p>
                    <p>You also can try to convince the guards to lower your bail... or to let you go scott-free! This all depends on your charisma and luck! If you fail - the guards will raise your bail - so use wisely!</p>
                    <p>You also have the option of fighting the guards to get out. The more difficult the store you robbed, the tougher the guard! There is no chump option here so be careful!</p>
                    <p>Finally, you can simply pay your bail if you have the money - to get out as soon as you came in.</p>
                </div>
            }
        ]
            let content = InstructionData.map((tab,i)=>{
                if(i===0){
                    return <InstructionSection data={tab} isOpen={true} />
                }
                return <InstructionSection data={tab} isOpen={false}/>
            });
        return <ul className="instructionList"><li><h1>Instructions</h1></li>{content}</ul>
    }
}

export default Instructions;