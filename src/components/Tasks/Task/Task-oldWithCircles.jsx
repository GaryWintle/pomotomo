import { TaskContext } from '../../../App';
import { formatTime } from '@utils/timeUtils';
import { useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import styles from './Task.module.css';
import close from '@assets/xplus.svg';

function Task({ task, setPomoText, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const {
    onDeleteTask,
    isRunning,
    setIsRunning,
    countdown,
    setCountdown,
    activeTaskId,
    setActiveTaskId,
  } = useContext(TaskContext);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = task.taskTime > 0 ? countdown / task.taskTime : 0;

  function timerButton() {
    setIsRunning((prev) => !prev);
    setPomoText('Okay, time to focus!');
  }

  function getStrokeColor() {
    if (!isRunning) return 'var(--neutral-mid)';
    if (countdown < 60) return 'var(--red-mid)';
    return 'var(--green-mid)';
  }

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
  }, [isRunning, setCountdown, setIsRunning]);

  useEffect(() => {
    document.title = `${countdown}s`;
  }, [countdown]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.taskContainer}
        animate={{
          scale: isDragging ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{ width: '100%', height: '100%' }}
      >
        <motion.li
          ref={setNodeRef}
          {...attributes}
          style={style}
          className={styles.task}
        >
          <div {...listeners}>
            <motion.button className={styles.timerButton}>
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
          </div>

          <button type="button" className={styles.closeButton}>
            <img
              src={close}
              alt="close"
              onClick={() => onDeleteTask(task.id)}
            />
          </button>
        </motion.li>
      </motion.div>
    </AnimatePresence>
  );
}

export default Task;
