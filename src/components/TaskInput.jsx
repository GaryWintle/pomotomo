import { useState } from 'react';

function TaskInput({ onAddTask, setActiveMachine }) {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

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
      role="form"
      aria-label="Task Input"
      className="task-input-container"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter your Task"
        value={taskText}
        onChange={textInput}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
      ></input>

      <input
        type="number"
        placeholder="Time to Finish Task"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
      ></input>

      <button>Add Task</button>
    </form>
  );
}

export default TaskInput;
