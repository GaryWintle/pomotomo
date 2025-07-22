import Task from '../Task/Task';
import styles from './TaskList.module.css';

function TaskList({ task, setPomoText }) {
  return (
    <ul className={styles.container}>
      {task.map((task) => (
        <Task task={task} setPomoText={setPomoText} />
      ))}
    </ul>
  );
}

export default TaskList;
