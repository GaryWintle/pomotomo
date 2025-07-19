import { useState } from 'react';
import styles from './TaskInput.module.css';

import TextInput from '../TextInput/TextInput';
import TimeInput from '../TimeInput/TimeInput';

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

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TextInput
        taskText={taskText}
        setTaskText={setTaskText}
        setActiveMachine={setActiveMachine}
      />

      <TimeInput taskTime={taskTime} setTaskTime={setTaskTime} />

      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
