import { useState } from 'react';

function TaskInput({ onAddTask, setActiveMachine }) {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) return;
    const newTask = { taskText, taskTime, completed: false, id: Date.now() };
    console.log(newTask);
    onAddTask(newTask);
    setTaskText('');
    setTaskTime(0);
  }

  function textInput(e) {
    setTaskText(e.target.value);
    // setActiveMachine('readingAnim');
  }

  function handleTextFocus() {
    setActiveMachine('readingAnim');
  }

  function handleTextBlur() {
    setActiveMachine('idleAnim');
  }

  return (
    <form
      className="task-module"
      role="form"
      aria-label="Task Input"
      onSubmit={handleSubmit}
    >
      <div className="task-module__group">
        <label htmlFor="taskText" className="task-module__label">
          Enter your Task
        </label>
        <input
          className="task-module__input"
          id="taskText"
          type="text"
          placeholder=""
          name="taskText"
          value={taskText}
          onChange={textInput}
          onFocus={handleTextFocus}
          onBlur={handleTextBlur}
        ></input>
      </div>

      <div className="task-module__group">
        <label htmlFor="taskTime" className="task-module__label">
          Time Limit
        </label>
        <div className="task-module__time-wrapper">
          <div className="task-module__time-input">
            <button className="task-module__time-change task-module__time-change--decrease">
              -
            </button>
            <input
              className="task-module__number-input"
              id="taskTime"
              type="text"
              placeholder="00:00"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              min="1"
            ></input>
            <button className="task-module__time-change task-module__time-change--increase">
              +
            </button>
          </div>
          <p>1 hour & 15 minutes</p>
        </div>
      </div>

      <button type="submit" className="task-module__button">
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
