import { formatTime } from '../../utils/timeUtils';
import styles from './Task.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function Task({
  task,
  isActive,
  onSetActiveTask,
  setPomoText,
  isRunning,
  countdown,
  onTimerButton,
}) {
  function handleSetActive() {
    onSetActiveTask(task.id);
    setPomoText(`Working on: ${task.taskText}`);
  }

  return (
    <li className={styles.task}>
      <motion.button
        className={clsx(styles.timer, {
          [styles.timerRunning]: isRunning && isActive,
          [styles.timerWarning]: isRunning && isActive && countdown < 60,
          [styles.finished]: isRunning && isActive && countdown === 0,
        })}
        whileTap={{ scale: 0.95 }}
        onClick={isActive ? onTimerButton : handleSetActive}
      >
        {isActive ? formatTime(countdown) : formatTime(task.taskTime)}
      </motion.button>
      <span className={styles.text}>{task.taskText}</span>
    </li>
  );
}

export default Task;
