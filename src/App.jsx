import { useState } from 'react';

import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <PomoText />
      <Pomotomo activeMachine={activeMachine} />
      <TaskInput
        onAddTask={handleAddTask}
        setActiveMachine={setActiveMachine}
      />
      <TaskList task={task} onAddTask={handleAddTask} />
    </div>
  );
}

export default App;
