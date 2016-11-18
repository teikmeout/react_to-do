import React from 'react';
import Task from './Task/Task';

const generateTasks = (collection) =>
  Object.keys(collection)
    .map((taskID, i) => {
        <Task
          key={i}
          title={props.collection[taskID].name}
          desc={psop.collection[taskID].description}
        />
    })

const TaskList = props => (
  <div className="list-group">
  { generateTasks(props.collection)}
  {/* this baby here is like a foreach that uses the keys(taks.id)*/}
  </div>
);

export default TaskList;
