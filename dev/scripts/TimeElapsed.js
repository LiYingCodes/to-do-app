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

    

    // componentDidMount() {
    //     const dbRef = firebase.database().ref('todos');
    //     dbRef.on('value', (snapshot) => {
    //         const data = snapshot.val()
    //         console.log(data);
    //         this.setState({
    //             timeElapsed: data.inputTime
    //         })
    //     })
    // }
    
    timeElapsed(){
        const currentTime = new Date().getTime();
        return currentTime - this.props.inputTime
        // const difference
    
    }
    
    
    render() {
        return <p>{this.timeElapsed()}</p>
    }
}
    
export default TimeElapsed;