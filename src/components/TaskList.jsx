import React from 'react';

const TaskList = props => (
  <div className="list-group">
    <button
      type="button"
      className="list-group-item"
      title="Click to Complete"
    >
      <strong>{props.title}</strong>{props.desc}
    </button>
  </div>
);

export default TaskList;
