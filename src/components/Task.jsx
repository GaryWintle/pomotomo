function Task({ task }) {
  return (
    <li className="task-wrapper">
      <div className="task-timer">{task.taskTime}</div>
      <span className="task-text">{task.taskText}</span>
    </li>
  );
}

export default Task;
