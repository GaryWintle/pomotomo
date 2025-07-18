const TextInput = ({ taskText, setTaskText, setActiveMachine }) => {
  return (
    <div className="task-module__group">
      <label htmlFor="taskText" className="task-module__label">
        Enter your Task
      </label>
      <input
        className="task-module__input"
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
