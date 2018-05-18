import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import ToDoNow from './ToDoNow'
import ToDoSometime from './ToDoSometime'
import CompletedToDo from './CompletedToDo'
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
      completedToDos: [],
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
            return value.counter >= 4 && value.completed !== true;
        });

        const toDoSometimes = todos.filter((value) => {
          return value.counter <= 3 && value.completed !== true;
        });

        //just filter completed based on general todo array
        const completedToDos = todos.filter((todo) => {
          return todo.completed === true;
        });

        this.setState({         
          toDoNows: toDoNows,
          toDoSometimes: toDoSometimes, 
          completedToDos: completedToDos,
         })
      });
    }

  // 5 LISTEN TO CHANGE IN SORT BUTTON
    // sort() toDoNows, toDoSometimes by time
    // set state
    // sort() toDoNows, toDoSometimes by counter
    // set state
  sort(array){
    array.sort();
    this.setState();
  }

  // 6 REMOVE TODO
  // create reference to db and also where we run the method
  removeToDo(key){
    firebase.database().ref(`todos/${key}`).remove()
  }

  // function to remove all completed items
  removeAll(){
    const removeCompleted = this.state.completedToDos.forEach((itemsToRemove => {
      this.removeToDo(itemsToRemove.key)
    }))
  }
  
  // 7 COMPLETED STUFF
  markAsComplete(itemComplete, completed){
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
                <ToDoNow 
                key={toDoNow.key}
                task ={toDoNow.task}
                counter={toDoNow.counter}
                firebaseKey ={toDoNow.key} 
                markAsComplete={this.markAsComplete}
                removeToDo={this.removeToDo}
                removeAll={this.removeAll}/>
              )
            })}
          </ul>
        </div>
        
        {/* List to display toDoSometime*/}
        <div className="toDoSometime">
          <h1>Do Sometime
            <button onClick={() => this.sort()}>Sort</button>
          </h1>
          <ul>
            {this.state.toDoSometimes.map(toDoSometime => {
              return (
                <ToDoSometime
                  key={toDoSometime.key}
                  task={toDoSometime.task}
                  counter={toDoSometime.counter}
                  firebaseKey={toDoSometime.key} 
                  markAsComplete={this.markAsComplete}
                  removeToDo={this.removeToDo}
                  removeAll={this.removeAll} />
              )
            })}
          </ul>
        </div>

      {/* List to display completedToDo*/}
      <div className="completedToDo">
        <h1>Completed
          <button onClick={() => this.removeAll()}> Remove All </button>
        </h1>
        <ul>
          {this.state.completedToDos.map(completedToDo => {
            return (
              <CompletedToDo
                key={completedToDo.key}
                task={completedToDo.task}
                counter={completedToDo.counter}
                firebaseKey={completedToDo.key}
                removeToDo={this.removeToDo}
                removeAll={this.removeAll}/>
            )
          })}
        </ul>
      </div>
      <Footer />
      </div>;  
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
