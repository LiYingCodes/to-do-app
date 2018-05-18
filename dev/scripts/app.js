import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD7oeRT-QlztAZmjyA80saMpuV8rIkK9yw",
  authDomain: "to-do-app-d86cc.firebaseapp.com",
  databaseURL: "https://to-do-app-d86cc.firebaseio.com",
  projectId: "to-do-app-d86cc",
  storageBucket: "to-do-app-d86cc.appspot.com",
  messagingSenderId: "468971990896"
};

firebase.initializeApp(config);

class App extends React.Component {
  // 1 SET UP CONSTRUCTOR
  constructor() {
    //set super to unlock "this" keyword
    super(); 
    // set initial states, make sure all empty:
    this.state = {
      todos: [], //push all tasks
      toDoNows: [], // push tasks with counter 4 and 5 in here
      toDoSometimes: [], //push tasks with counter 3 and less in here
      completedToDoNows: [],
      completedToDoSometimes: []
    };    
  }

// 2 SET UP FIREBASE
  componentDidMount() {
    const dbRef = firebase.database().ref('todos');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
        const todos = [];
      
        for (let items in data) {
          data[items].key = items // putting keys as property in obj
          todos.push(data[items]);
        }

        const toDoNows = 
          todos.filter((value) => {
            return value.counter >= 4;
        });

        const toDoSometimes = todos.filter((value) => {
          return value.counter <= 3;
          });

        const completedToDoNows = toDoNows.filter((toDoNow) => {
          return toDoNow.completed === true;
        });

        const completedToDoSometimes = toDoSometimes.filter((toDoSometime) => {
          return toDoSometime.completed === true;
        });
        
        this.setState({
          toDoNows: toDoNows,
          toDoSometimes: toDoSometimes,
          //this makes it such that it is printed twice on both sides completed and not completed....
          completedToDoNows: completedToDoNows,
          completedToDoSometimes: completedToDoSometimes
        })
      });
    }

  

  // 5 LISTEN TO CHANGE IN SORT BUTTON
    // sort() toDoNows, toDoSometimes by time
    // set state
    // sort() toDoNows, toDoSometimes by counter
    // set state

  // 6 REMOVE TODO
  // create reference to db and also where we run the method
  removeToDo(itemToRemove){
    console.log(itemToRemove);
    firebase.database().ref(`todos/${itemToRemove}`).remove()
  }

  // function to remove all items and reset states
  // removeAll(){
  //   this.setState({
  //     completedToDoNows:'',
  //     completedToDoSometimes: ''
  //   })
  // }
  
  // 7 COMPLETED STUFF
  markAsComplete(itemComplete, completed){
    console.log(itemComplete, completed)
    firebase
      .database()
      .ref(`todos/${itemComplete}`)
      .update({ 
        completed: completed === true ? false : true 
      });
  }

  render() {
    return <div>
        <Header />
        <Form />

        {/* List to display toDoNows */}
        <div className="toDoNow">
          <h1>Do Now</h1>
          <ul>
            {this.state.toDoNows.map(toDoNow => {
              return (
              <li key={toDoNow.key}>
                {toDoNow.task} - {toDoNow.counter}
                <button onClick={() => this.markAsComplete(toDoNow.key)}>
                  Done
                </button>
                <button onClick={() => this.removeToDo(toDoNow.key)}>
                  Remove
                </button>
              </li>
              )
            })}
          </ul>

          <h2>Completed</h2>
          <ul>
            {this.state.completedToDoNows.map(toDoNow => {
              return (
              <li key={toDoNow.key}>
                {toDoNow.task} - {toDoNow.counter}
                <button onClick={() => this.removeToDo(toDoNow.key)}>
                  Remove
                </button>
              </li>
              )
            })}
          </ul>
        </div>

        {/* List to display toDoSometime*/}
        <div className="toDoSometime">
          <h1>Do Sometime</h1>
          <ul>
            {this.state.toDoSometimes.map(toDoSometime => {
              return (
              <li key={toDoSometime.key}>
                  {toDoSometime.task} - {toDoSometime.counter}
                  <button onClick={() => this.markAsComplete(toDoSometime.key)}>
                    Done
                  </button>
                  <button onClick={() => this.removeToDo(toDoSometime.key)}>
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>

          <h2>Completed</h2>
          <ul>
            {this.state.completedToDoSometimes.map(toDoSometime => {
              return (
                <li key={toDoSometime.key}>
                  {toDoSometime.task} - {toDoSometime.counter}
                </li>
              )
            })}
          </ul>
        </div>
        <Footer />
      </div>;  
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
