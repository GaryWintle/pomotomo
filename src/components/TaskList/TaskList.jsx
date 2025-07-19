import Task from '../Task/Task';
import styles from './TaskList.module.css';

function TaskList({ task }) {
  return (
    <ul className={styles.container}>
      {task.map((task) => (
        <Task task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
