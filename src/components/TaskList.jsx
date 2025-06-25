import Task from './Task';

function TaskList({ task }) {
  return (
    <ul className="listContainer">
      {task.map((task) => (
        <Task task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
