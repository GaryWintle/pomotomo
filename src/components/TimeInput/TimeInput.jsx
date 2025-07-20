import TimePresets from '../TimePresets/TimePresets';
import { formatReadableTime } from '../../utils/timeUtils';
import styles from './TimeInput.module.css';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';

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
          <button
            type="button"
            onClick={() => decrement(60)}
            className={styles.button}
          >
            <img src={minus} alt="minus 1 minute" />
          </button>
          <input
            className={styles.time}
            id="taskTime"
            type="text"
            value={formatReadableTime(taskTime)}
            disabled
          ></input>
          <button
            type="button"
            onClick={() => increment(60)}
            className={styles.button}
          >
            <img src={plus} alt="plus 1 minute" />
          </button>
        </div>
        <TimePresets setTaskTime={setTaskTime} />
      </div>
    </div>
  );
};

export default TimeInput;
