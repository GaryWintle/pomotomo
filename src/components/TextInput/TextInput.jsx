import styles from './TextInput.module.css';

const TextInput = ({ taskText, setTaskText, setActiveMachine }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="taskText" className="task-module__label">
        Enter your Task
      </label>
      <input
        className={styles.input}
        id="taskText"
        type="text"
        name="taskText"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onFocus={() => setActiveMachine('readingAnim')}
        onBlur={() => setActiveMachine('idleAnim')}
      ></input>
    </div>
  );
};

export default TextInput;
