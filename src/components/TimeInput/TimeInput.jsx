import TimePresets from '../TimePresets/TimePresets';
import { formatReadableTime } from '../../utils/timeUtils';

const TimeInput = ({ taskTime, setTaskTime }) => {
  const increment = (amount) => {
    setTaskTime((prev) => Math.max(0, prev + amount));
  };
  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="task-module__group">
      <label htmlFor="taskTime" className="task-module__label">
        Time Limit
      </label>
      <div className="task-module__time-wrapper">
        <div className="task-module__time-input">
          <button
            type="button"
            onClick={() => decrement(60)}
            className="task-module__time-change task-module__time-change--decrease"
          >
            -
          </button>
          <input
            className="task-module__number-input"
            id="taskTime"
            type="text"
            value={formatReadableTime(taskTime)}
          ></input>
          <button
            type="button"
            onClick={() => increment(60)}
            className="task-module__time-change task-module__time-change--increase"
          >
            +
          </button>
        </div>
        <TimePresets setTaskTime={setTaskTime} />
      </div>
    </div>
  );
};

export default TimeInput;
