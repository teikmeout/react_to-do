import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';

import './App.css';
import './GA_gear.png';

export default class App extends React.Component {

  //
  constructor(props) {
    super();

    this.state = {
      tasks: {},
    };

    this.addTask = this.addTask.bind(this);
  }

  addTask(name, desc){

    // fetch('/api/puppies', {
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // method: 'POST',
    // body: JSON.stringify(payload)
    // });

    // we need to create the body of the POST request
    fetch('/tasks', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      method: 'POST',
      body: JSON.stringify({name:name, desc:desc})
    })
    .then(r => r.json)
    .then(newTask => {
      console.log('this other sheeeeeet data on fetch', newTask);
      const newState = {...this.state.tasks};
      newState[newTask.id] = newTask;
      this.setState({tasks: newState});
    })
    .catch(error => console.log(error))

    // ajax
    //   .post(newTask)
    //   .then(data => {
    //     const task = new Task(data);
    //     const newState = {...this.state.tasks};
    //     newState.push(task);
    //     this.setState({tasks: newState})
    //   })
    // checking if stuff is there
    // see how arguments refers to name and desc that are being passed
    console.log(arguments);

    // we are CLONING the state, and DESTRUCTURING THE STATE
    // so we can modify it and set it again
    // const newState = {...this.state.tasks};

    // POST to the db, this name and desc
    // .then update the state, bitches!!

  }

  render() {
    return (
      <container>
        <header>
          <Nav />
        </header>
        <main className="container">
          <section className="jumbotron">
            <h1>Task Manager</h1>
            {/* look at this baby, we're passing addTask over here as a prop*/}
            <TaskForm addTask={this.addTask}/>
          </section>
          {/* to do lists */}
          <section className="row">
            <article className="col-md-4">
              <h3>Open Items</h3>
              {/* OPEN tasks */}
              <TaskList collection={this.state.tasks}/>
            </article>

            <article className="col-md-4">
              <h3>Completed Items</h3>
              {/* COMPLETED tasks */}
              <TaskList collection={this.state.tasks}/>
            </article>

            <article className="col-md-4">
              <h3>Deleted Items</h3>
              {/* DELETED tasks */}
              <TaskList collection={this.state.tasks}/>
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>

      </container>
    );
  }

}
