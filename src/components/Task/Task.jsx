import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/timeUtils';
import styles from './Task.module.css';

function Task({ task }) {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(task.taskTime);

  let timerColor = 'var(--green-mid) ';

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

  return (
    <li className={styles.task}>
      <button
        className={styles.timer}
        onClick={() => setIsRunning((go) => !go)}
        style={{ backgroundColor: timerColor }}
      >
        {formatTime(countdown)}
      </button>
      <span className={styles.text}>{task.taskText}</span>
    </li>
  );
}

export default Task;
