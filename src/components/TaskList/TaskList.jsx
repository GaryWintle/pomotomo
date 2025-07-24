import Task from '../Task/Task';
import styles from './TaskList.module.css';

// TaskList component
function TaskList({ tasks, activeTaskId, onSetActiveTask, setPomoText }) {
  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          isActive={task.id === activeTaskId}
          onSetActiveTask={onSetActiveTask}
          setPomoText={setPomoText}
        />
      ))}
    </div>
  );
}

export default TaskList;
