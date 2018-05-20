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

  // 5 SORT BUTTON
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
  
  // 7 COMPLETED STUFF
  markAsComplete(itemComplete, completed){
      firebase
      .database()
      .ref(`todos/${itemComplete}`)
      .update({ 
        completed: completed === true ? false : true 
      });
  }

  // CHANGING COUNTER TO DISPLAY ICON
  chores(counter){
      if (counter === 1) {
        return <div>o</div>
        } else if (counter === 2) {
            return <div>oo</div>
        } else if (counter === 3) {
            return <div>ooo</div>
        } else if (counter === 4) {
            return <div>oooo</div>;
        } else if (counter === 5) {
            return <div>ooooo</div>;
        } else {
            return;
      }
    }

  // RENDER FUNCTIONS
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
    return <div>
        <Header />
        <Form 
          chores={this.chores} />

        {/* List to display toDoNows */}
        <div className="toDoNow">
          <h1>Do Now</h1>
          {/* <Subheader title='donuts'/>
          <Button click={this.handleSort} buttonTitle='do something'/> */}
          {/* <Button click={this.sortRender} buttonTitle='do something' /> */}
          <button onClick={() => {
              this.handleSort();
            }}>
            Sort
          </button>
          <ul>
            {this.state.filter
              ? this.sortRender(this.state.toDoNows)
              : this.defaultRender(this.state.toDoNows)}
          </ul>
        </div>

        {/* List to display toDoSometime*/}
        <div className="toDoSometime">
          <h1>Do Sometime</h1>
          <button onClick={() => {
              this.handleSort();
            }}>
            Sort
          </button>
          <ul>
            {this.state.filter
              ? this.sortRender(this.state.toDoSometimes)
              : this.defaultRender(this.state.toDoSometimes)}
          </ul>
        </div>

        {/* List to display completedToDo*/}
        <div className="completedToDo">
          <h1>Completed</h1>
          <button onClick={() => this.removeAll()}> Remove All </button>
          <ul>
            {this.state.completedToDos.map(completedToDo => {
              return (<CompletedToDo 
                key={completedToDo.key} 
                task={completedToDo.task} />
              );
            })}
          </ul>
        </div>
        <Footer />
      </div>;  
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
