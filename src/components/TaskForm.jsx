import React from 'react';

// this is a stateless function VS declaring a CLASS
// we want stateless function because REACT has many lifecycle methods
// but the main reason is because as part of the REACT framework
// we run our classes through a lifecycle
// and we can know if componentWillMount or componentDidMount
// to PREVENT ALL THIS SHIT we create stateless functions
// advantage of not going through the cycle: save processing power and shorten the processing power.
// this is relatively new like about a (2015)
export default function TaskForm(props) {
  const handleSubmit = (event) => {
    // first thing that we want to prevent is the default behaviour of the submit
    // the submit bubbles up to the window to send and reload
    // stopping the event from leaving the form
    event.preventDefault();
    // another option to stop bubbling up
    // event.stopPropagation();
    // to see what event really means
    console.log('This SHET', event.target);
    // saving the target which is the FORM
    const myForm = event.target;

    // calling out the addTask function that is inside of my props
    props.addTask(
      myForm.taskName.value)
    console.log(newTask);
    // this is to avoid the event propagating and moving forward
    // and killing this function in it's tracks right here.
    return false;

    // THIS IS VERY IMPORTANT
    // we cannot setState in child Components
    // we cannot change props values
    // how do we send data back to parent element so it can access the state and call the PSQL DB
    // WE USE A FUCKING FUNCTION PASSED AS A PROP
  }
  return (
    <form className="form-inline" onSubmit={handleSubmit}>

      <div className="form-group">
        <label className="sr-only" htmlFor="taskName">Task Name</label>
        <input type="text" className="form-control input-lg" name="taskName" placeholder="Task Name" />
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="taskDesc">Task Description</label>
        <input type="text" className="form-control input-lg" name="taskDesc" placeholder="Task Description" />
      </div>
      <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
    </form>

  );
}
