import { useState, useEffect } from 'react';
import { formatTime } from '@utils/timeUtils';
import styles from './Task.module.css';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import close from '@assets/xplus.svg';

function Task({ task, setPomoText, onDeleteTask }) {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(task.taskTime);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = task.taskTime > 0 ? countdown / task.taskTime : 0;

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

  function getStrokeColor() {
    if (!isRunning) return 'var(--neutral-mid)';
    if (countdown < 60) return 'var(--red-mid)';
    return 'var(--green-mid)';
  }

  return (
    <AnimatePresence>
      <motion.li className={styles.task}>
        <motion.button
          className={styles.timerButton}

          // whileTap={{ scale: 0.95 }}
          // onClick={timerButton}
        >
          <svg
            className={clsx(styles.circleTimerDefault, {
              [styles.circleTimerRunning]: isRunning,
              [styles.circleTimerWarning]: isRunning && countdown < 60,
              [styles.finished]: isRunning && countdown === 0,
            })}
            whileTap={{ scale: 0.95 }}
            onClick={timerButton}
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--neutral-white"
              fill="none"
              strokeWidth="20"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#eee"
              fill="none"
              strokeWidth="10"
            />

            <motion.circle
              cx="60"
              cy="60"
              r="50"
              stroke={getStrokeColor()}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              initial={false}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
          <span
            className={clsx(styles.timerDefault, {
              [styles.timerRunning]: isRunning,
              [styles.timerWarning]: isRunning && countdown < 60,
              [styles.finished]: isRunning && countdown === 0,
            })}
          >
            {formatTime(countdown)}
          </span>
        </motion.button>
        <span className={styles.text}>{task.taskText}</span>
        <button type="button" className={styles.closeButton}>
          <img src={close} alt="close" onClick={() => onDeleteTask(task.id)} />
          {/* () => onDeleteWatched(movie.imdbID) */}
        </button>
      </motion.li>
    </AnimatePresence>
  );
}

export default Task;
