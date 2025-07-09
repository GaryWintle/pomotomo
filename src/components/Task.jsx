import { useState, useEffect } from 'react';

function Task({ task }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  return (
    <li className="task-wrapper">
      <div className="task-timer">{task.taskTime}</div>
      <span className="task-text">{task.taskText}</span>
    </li>
  );
}

export default Task;
