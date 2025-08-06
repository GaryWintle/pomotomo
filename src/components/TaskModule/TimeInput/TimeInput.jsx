import { TimePresets } from './TimePresets';
import { formatReadableTime } from '../../../utils/timeUtils';
import styles from './TimeInput.module.css';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { motion } from 'framer-motion';
import { inputButtonVariants } from '../../../utils/motionPresets';

const TimeInput = ({ taskTime, setTaskTime }) => {
  const increment = (amount) => {
    setTaskTime((prev) => Math.max(0, prev + amount));
  };
  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="taskTime" className="task-module__label">
        Time Limit
      </label>
      <div className={styles.lineWrapper}>
        <div className={styles.inputWrapper}>
          <motion.button
            type="button"
            onClick={() => decrement(60)}
            className={styles.button}
            variants={inputButtonVariants}
            initial={'rest'}
            whileHover={'hover'}
            whileTap={'tap'}
          >
            <img src={minus} alt="minus 1 minute" />
          </motion.button>
          <motion.input
            className={styles.time}
            id="taskTime"
            type="text"
            value={formatReadableTime(taskTime)}
            key={taskTime}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
            disabled
          ></motion.input>
          <motion.button
            type="button"
            onClick={() => increment(60)}
            className={styles.button}
            variants={inputButtonVariants}
            initial={'rest'}
            whileHover={'hover'}
            whileTap={'tap'}
          >
            <img src={plus} alt="plus 1 minute" />
          </motion.button>
        </div>
        <TimePresets setTaskTime={setTaskTime} />
      </div>
    </div>
  );
};

export default TimeInput;
