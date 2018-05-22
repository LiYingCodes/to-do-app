import React from 'react';
import firebase from 'firebase';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            task:'',
            counter: 1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);           
        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleClickMinus = this.handleClickMinus.bind(this);
    }

    handleClickPlus(e) {
        e.preventDefault();
        this.setState({ counter: this.state.counter + 1 })
        this.state.counter === 5 ? this.setState({ counter: this.state.counter + 0 }) : null;
    }

    handleClickMinus(e) {
        e.preventDefault();
        this.setState({ counter: this.state.counter - 1 })
        this.state.counter === 1 ? this.setState({ counter: this.state.counter - 0 }) : null;
    }

    // EVENTS TO HAPPEN WHEN FORM IS SUBMITTED
    handleSubmit(e) {
        e.preventDefault();
        // create variable with current state of things we want to keep track of in no.1
    
        const todo = {
            task: this.state.task,
            counter: this.state.counter,
            inputTime: new Date().getTime(),
            completed: false
        }
        // push time of input so that we can compare the now time vs. time of input later
        
        // create reference to firebase
        const dbRef = firebase.database().ref('todos');
        // push variable created into firebase
        dbRef.push(todo);
    
        // set state of everything back to empty string to clear the input field
        this.setState({
            task: '',
            counter: 0
        })
    }

    // 4 LISTEN FOR CHANGE IN INPUT FIELD
    handleChange(e){
        console.log(e.target.value);
        this.setState({
            task: e.target.value
        })
    }

    render() {
        return <div>
            {/* Form for getting todo task, user rating of importance of task and also time of input */}
        <form action="" onSubmit={this.handleSubmit} className="clearfix">
            <div className="taskInput">
                <h3>1. Add To Do:</h3>
                <p>
                    <input type="text" value={this.state.task} onChange={this.handleChange} placeholder="Input task here!"/>
                </p>
            </div>
            <div className="importance">
                <h3>2. How urgent is it?</h3>
                <div className="button-row flex">
                    <button counter={this.props.counter} onClick={this.handleClickMinus}>
                        <i className="fas fa-minus"></i> </button>
                        <span>{this.props.chores(this.state.counter)}</span>
                    <button counter={this.props.counter} onClick={this.handleClickPlus}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <input className="btn" type="submit" value="Add to list!" />
        </form>
    </div>}
}
export default Form;