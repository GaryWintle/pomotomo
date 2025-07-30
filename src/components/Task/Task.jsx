import { formatTime } from '../../utils/timeUtils';
import styles from './Task.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function Task({
  task,
  setPomoText,
  setSelectedTaskId,
  setIsRunning,
  runningTaskId,
  setRunningTaskId,
  setTaskRemainingTimes,
  getRemainingTime,
}) {
  const isThisTaskRunning = runningTaskId === task.id;
  const remainingTime = getRemainingTime(task.id, task.taskTime);

  function timerButton() {
    setSelectedTaskId(task.id);
    if (isThisTaskRunning) {
      // Stop the current task
      setIsRunning(false);
      setRunningTaskId(null);
    } else {
      // Initialize the time for this task if not already set
      setTaskRemainingTimes((prev) => ({
        ...prev,
        [task.id]: prev[task.id] ?? task.taskTime,
      }));

      // Start this task
      setIsRunning(true);
      setRunningTaskId(task.id);
      setPomoText('Okay, time to focus!');
    }
  }

  return (
    <li className={styles.task}>
      <motion.button
        className={clsx(styles.timer, {
          [styles.timerRunning]: isThisTaskRunning,
          [styles.timerWarning]: isThisTaskRunning && remainingTime < 60,
          [styles.finished]: remainingTime === 0,
        })}
        whileTap={{ scale: 0.95 }}
        onClick={timerButton}
      >
        {formatTime(remainingTime)}
      </motion.button>
      <span className={styles.text}>{task.taskText}</span>
    </li>
  );
}

export default Task;
