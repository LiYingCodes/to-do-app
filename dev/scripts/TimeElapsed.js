import React from 'react'
import firebase from 'firebase'

  /* List to Time */
class TimeElapsed extends React.Component {
    constructor() {
        super();
        this.state = {
            timeElapsed: 0
        }
        this.timeElapsed = this.timeElapsed.bind(this);
    }

    //function to calculate difference between current time and input time
    //convert the difference which is in milliseconds into seconds, minutes, hours or days  
    timeElapsed(){
        const currentTime = new Date().getTime();

        const timeInMs = currentTime - this.props.inputTime;
        let timeInSeconds = Math.floor(timeInMs / 1000);
        let timeInMinutes = Math.floor(timeInSeconds / 60);
        let timeInHours = Math.floor(timeInMinutes / 60);
        let timeInDays = Math.floor(timeInHours / 24)
        timeInHours = timeInHours % 24;
        timeInMinutes = timeInMinutes % 60;
        timeInSeconds = timeInSeconds % 60;
        
        return (            
            timeInDays === 0 ? <p>{timeInHours} hour(s) {timeInMinutes} minute(s) ago</p> : <p>{timeInDays} day(s) {timeInHours} hour(s) ago</p>
        )
    }
    
    render() {
        return (
        <p className="timestamp"><em>Added to list {this.timeElapsed()}.</em></p>
        )
    }
}
    
export default TimeElapsed;