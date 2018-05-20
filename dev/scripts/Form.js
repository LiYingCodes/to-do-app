import React from 'react';
import firebase from 'firebase';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            task:'',
            counter: 0,
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
        this.state.counter === 0 ? this.setState({ counter: this.state.counter - 0 }) : null;
    }


    handleSubmit(e) {
        e.preventDefault();
        // create variable with current state of things we want to keep track of in no.1
    
        const todo = {
            task: this.state.task,
            counter: this.state.counter,
            inputTime: new Date().getTime(),
            completed: false
        }
        // ALSO PUSH TIME OF INPUT so that we can compare the now time vs. time of input later
        // console.log(todo);
        
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
            <form action="" onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.task} onChange={this.handleChange} />
                <button className="btn-plus" counter={this.props.counter} onClick={this.handleClickPlus}>
                    Increase
                </button>
                <button className="btn-minus" counter={this.props.counter} onClick={this.handleClickMinus}>
                    Decrease
                </button>
                <p> Counter: {this.props.chores(this.state.counter)} </p>
                {/* <p>Counter: {this.state.counter}</p> */}
              <input type="submit" />
            </form>
          </div>;
    }
}
export default Form;