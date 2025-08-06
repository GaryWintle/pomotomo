import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/timeUtils';
import styles from './Task.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import TaskTimeCircle from '../TaskTimeCircle/TaskTimeCircle';

function Task({ task, setPomoText }) {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(task.taskTime);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCountdown((cdown) => {
        if (cdown <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return cdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    document.title = `${countdown}s`;
  }, [countdown]);

  function timerButton() {
    setIsRunning((prev) => !prev);
    setPomoText('Okay, time to focus!');
  }

  return (
    <li className={styles.task}>
      <TaskTimeCircle task={task} countdown={countdown} isRunning={isRunning} />
      <motion.button
        className={clsx(styles.timer, {
          [styles.timerRunning]: isRunning,
          [styles.timerWarning]: isRunning && countdown < 60,
          [styles.finished]: isRunning && countdown === 0,
        })}
        whileTap={{ scale: 0.95 }}
        onClick={timerButton}
      >
        {formatTime(countdown)}
      </motion.button>
      <span className={styles.text}>{task.taskText}</span>
    </li>
  );
}

export default Task;
