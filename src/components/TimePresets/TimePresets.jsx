import styles from './TimePresets.module.css';
import clsx from 'clsx';

const TimePresets = ({ setTaskTime }) => {
  const presets = [10800, 7200, 3600, 1800, 900, 300];

  const increment = (amount) =>
    setTaskTime((prev) => Math.max(0, prev + amount));

  return (
    <>
      <div className={styles.container}>
        {presets.map((seconds) => (
          <button
            key={seconds}
            type="button"
            className={styles.button}
            onClick={() => increment(seconds)}
          >
            {seconds >= 3600 ? `${seconds / 3600}h` : `${seconds / 60}m`}
          </button>
        ))}
      </div>

      <button
        className={clsx(styles.button, styles.reset)}
        type="button"
        onClick={() => setTaskTime(0)}
      >
        Clear
      </button>
    </>
  );
};

export default TimePresets;
