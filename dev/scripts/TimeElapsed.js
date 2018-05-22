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
        const timeInSeconds = Math.floor(timeInMs / 1000);
        const timeInMinutes = Math.floor(timeInSeconds / 60);
        const timeInHours = Math.floor(timeInMinutes / 60);
        const timeInDays = Math.floor(timeInHours / 24)
        if (timeInSeconds < 60){
            return timeInSeconds + ' second(s) ago'
        } else if (timeInMinutes < 60) {
            return timeInMinutes + ' minute(s) ago'
        } else if (timeInHours < 24) {
            return timeInHours + ' hour(s) ago' 
        } else {
            return timeInDays + ' day(s) ago'
        }
    }
    
    render() {
        return (
        <p className="timestamp"><em>Added to list {this.timeElapsed()}.</em></p>
        )
    }
}
    
export default TimeElapsed;