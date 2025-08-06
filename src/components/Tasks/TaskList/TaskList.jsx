import { Task } from '@components/Tasks';
import styles from './TaskList.module.css';

function TaskList({ task, setPomoText }) {
  return (
    <ul className={styles.container}>
      {task.map((task) => (
        <Task key={task.id} task={task} setPomoText={setPomoText} />
      ))}
    </ul>
  );
}

export default TaskList;
