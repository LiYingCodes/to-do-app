import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import Todo from './Todo'
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
      filter: false
    };    
    this.handleSort = this.handleSort.bind(this);
    this.defaultRender = this.defaultRender.bind(this);
    this.sortRender = this.sortRender.bind(this);    
    this.chores = this.chores.bind(this)
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
          completedToDos: completedToDos
         })
      });
    }
    // 3, 4 is in Component Form.js

  // 5 SORT BUTTON -- TIED TO no.9 (render functions)
  // funtion checks the state of filter and flips it. If true, it will show make it false and vice versa.
  handleSort(){
    this.setState({
      filter: !this.state.filter
    })
  }

  // 6 REMOVE TODOS
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
  
  // 7 MARKING TASKS AS COMPLETED
  markAsComplete(itemComplete, completed){
      firebase
      .database()
      .ref(`todos/${itemComplete}`)
      .update({ 
        completed: completed === true ? false : true 
      });
  }

  // 8 CHANGING COUNTER TO DISPLAY ICONS INSTEAD OF A NUMBER
  chores(counter){
      return (
        <div>
          {(counter < 1) ? <img src="clipboard-b.png" /> : <img src="clipboard-b.png" />} 
          {(counter < 2) ? <img src="clipboard-g.png" /> : <img src="clipboard-b.png" />}
          {(counter < 3) ? <img src="clipboard-g.png" /> : <img src="clipboard-b.png" />}
          {(counter < 4) ? <img src="clipboard-g.png" /> : <img src="clipboard-b.png" />} 
          {(counter < 5) ? <img src="clipboard-g.png" /> : <img src="clipboard-b.png" />}       
        </div>
      )
    }

  //9 RENDER FUNCTIONS (FOR SORTED ITEMS VS. DEFAULT)
  defaultRender(array) {
    return(
      array.map(toDoNow => {
        return (
          <Todo
            key={toDoNow.key}
            task={toDoNow.task}
            counter={toDoNow.counter}
            chores={this.chores}
            firebaseKey={toDoNow.key}
            markAsComplete={this.markAsComplete}
            removeToDo={this.removeToDo}
            inputTime={toDoNow.inputTime}
            filter={this.state.filter} />
        )
      })
    )}

  sortRender(array) {
    const sorted = [...array].sort((a, b) => a.counter - b.counter) 
    return (
      sorted.map(toDoNow => {
        return (
          <Todo
            key={toDoNow.key}
            task={toDoNow.task}
            counter={toDoNow.counter}
            chores={this.chores}
            firebaseKey={toDoNow.key}
            markAsComplete={this.markAsComplete}
            removeToDo={this.removeToDo}
            inputTime={toDoNow.inputTime}
            filter={this.state.filter} />
        )
      })
    )
  }

  render() {
    return (
    <div>
        <div className="header-wrapper wrapper"><Header title="now or later??" /></div>
      <div className="wrapper flex"> 
      {/* wrapper container which contains form-chores-container, completed-container*/}
        <div className="form-chores-container"> 
        {/* contains: header,form,todo-container */}
          <Form chores={this.chores} />  
          <div className="btn-sort flex">
            <button className="btn-sort" onClick={() => {this.handleSort()}}> Sort </button>
          </div> {/* end of btn-sort container */}
          <div className="todo-container flex">
            <div className="now">
              <h2>Now:</h2>
              <ul>
                {this.state.filter
                  ? this.sortRender(this.state.toDoNows)
                  : this.defaultRender(this.state.toDoNows)}
              </ul>
            </div> {/* end of now */}
    
            <div className="sometime">
              <h2>Later:</h2>
              <ul>
                {this.state.filter
                  ? this.sortRender(this.state.toDoSometimes)
                  : this.defaultRender(this.state.toDoSometimes)}
              </ul>
            </div>{/* end of sometime */}
          </div> {/* end of todo-container */}
        </div>{/* end of form-chores-container */}

        <div className="completed-container">  
            <Header title="completed" />
            <button onClick={() => this.removeAll()}> Remove All </button>
          <div className="completed">
            <ul>
              {this.state.completedToDos.map(completedToDo => {
                return (<CompletedToDo 
                  key={completedToDo.key} 
                  task={completedToDo.task} />
                );
              })}
            </ul>
          </div>{/* end of completed */}
        </div>{/* end of completed-container */}
      </div> {/* end of wrapper */}   
        <Footer />
    </div>
  )}
}
      
ReactDOM.render(<App />, document.getElementById('app'));
