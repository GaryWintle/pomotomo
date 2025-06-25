function Task({ task }) {
  return (
    <li>
      <div className="list-timer">{task.taskTime}</div>
      <span>{task.taskText}</span>
      <button>X</button>
    </li>
  );
}

export default Task;
