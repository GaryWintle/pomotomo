import Task from './Task';

function TaskList({ task }) {
  return (
    <ul className="tasks-container">
      {task.map((task) => (
        <Task task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
