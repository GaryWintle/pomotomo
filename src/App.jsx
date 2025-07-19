import { useState } from 'react';

import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TextInput from './components/TextInput/TextInput';
import TimeInput from './components/TimeInput/TimeInput';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('idleAnim');
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) return;
    const newTask = { taskText, taskTime, completed: false, id: Date.now() };
    console.log(newTask);
    handleAddTask(newTask);
    setTaskText('');
    setTaskTime(0);
  }

  return (
    <div className="main-container">
      <PomoText />
      <Pomotomo activeMachine={activeMachine} />
      <TaskInput onSubmit={handleSubmit}>
        <TextInput
          setActiveMachine={setActiveMachine}
          taskText={taskText}
          setTaskText={setTaskText}
        />
        <TimeInput taskTime={taskTime} setTaskTime={setTaskTime} />
      </TaskInput>
      <TaskList task={task} onAddTask={handleAddTask} />
    </div>
  );
}

export default App;
