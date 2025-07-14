import { useState } from 'react';

function TaskInput({ onAddTask, setActiveMachine }) {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  function formatReadableTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join('');
  }

  const increment = (amount) => {
    setTaskTime((prev) => Math.max(0, prev + amount));
  };
  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };

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
              placeholder="00:00"
              value={formatReadableTime(taskTime)}
              onChange={(e) => setTaskTime(e.target.value)}
              min="1"
            ></input>
            <button
              type="button"
              onClick={() => increment(60)}
              className="task-module__time-change task-module__time-change--increase"
            >
              +
            </button>
          </div>
          <p>1 hour & 15 minutes</p>
          <div className="time-preset__container">
            <button
              type="button"
              onClick={() => increment(10800)}
              className="time-preset"
            >
              3h
            </button>
            <button
              type="button"
              onClick={() => increment(7200)}
              className="time-preset"
            >
              2h
            </button>
            <button
              type="button"
              onClick={() => increment(3600)}
              className="time-preset"
            >
              1h
            </button>
            <button
              type="button"
              onClick={() => increment(1800)}
              className="time-preset"
            >
              30m
            </button>
            <button
              type="button"
              onClick={() => increment(900)}
              className="time-preset"
            >
              15m
            </button>
            <button
              type="button"
              onClick={() => increment(300)}
              className="time-preset"
            >
              5m
            </button>
          </div>
          <button onClick={() => setTaskTime(0)}>Clear</button>
        </div>
      </div>

      <button type="submit" className="task-module__button">
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
