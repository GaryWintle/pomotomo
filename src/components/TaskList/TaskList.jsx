import Task from '../Task/Task';
import styles from './TaskList.module.css';

function TaskList({
  task,
  setPomoText,
  setSelectedTaskId,
  isRunning,
  setIsRunning,
  runningTaskId,
  setRunningTaskId,
  taskRemainingTimes,
  setTaskRemainingTimes,
  getRemainingTime,
}) {
  return (
    <ul className={styles.container}>
      {task.map((task, index) => (
        <Task
          key={task.id || index}
          task={task}
          setPomoText={setPomoText}
          setSelectedTaskId={setSelectedTaskId}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          runningTaskId={runningTaskId}
          setRunningTaskId={setRunningTaskId}
          taskRemainingTimes={taskRemainingTimes}
          setTaskRemainingTimes={setTaskRemainingTimes}
          getRemainingTime={getRemainingTime}
        />
      ))}
    </ul>
  );
}

export default TaskList;
