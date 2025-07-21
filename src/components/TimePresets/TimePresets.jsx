import styles from './TimePresets.module.css';
import { inputButtonVariants } from '../../utils/motionPresets';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const TimePresets = ({ setTaskTime }) => {
  const presets = [10800, 7200, 3600, 1800, 900, 600, 300];

  const increment = (amount) =>
    setTaskTime((prev) => Math.max(0, prev + amount));

  return (
    <>
      <div className={styles.container}>
        {presets.map((seconds) => (
          <motion.button
            key={seconds}
            type="button"
            className={styles.button}
            onClick={() => increment(seconds)}
            variants={inputButtonVariants}
            initial={'rest'}
            whileHover={'hover'}
            whileTap={'tap'}
          >
            {seconds >= 3600 ? `${seconds / 3600}h` : `${seconds / 60}m`}
          </motion.button>
        ))}

        <motion.button
          className={clsx(styles.button, styles.reset)}
          type="button"
          onClick={() => setTaskTime(0)}
          variants={inputButtonVariants}
          initial={'rest'}
          whileHover={'hover'}
          whileTap={'tap'}
        >
          Clear
        </motion.button>
      </div>
    </>
  );
};

export default TimePresets;
