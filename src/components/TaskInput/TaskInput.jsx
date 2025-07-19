import styles from './TaskInput.module.css';

const TaskInput = ({ onSubmit, children }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {children}

      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
