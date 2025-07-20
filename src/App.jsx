import { useState } from 'react';

import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(true);

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <PomoText />
      <Pomotomo activeMachine={activeMachine} />
      {moduleOpen && (
        <TaskInput
          onAddTask={handleAddTask}
          setActiveMachine={setActiveMachine}
          setModuleOpen={setModuleOpen}
        />
      )}
      <TaskList task={task} onAddTask={handleAddTask} />
    </div>
  );
}

export default App;
