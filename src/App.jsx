import { useState } from 'react';

import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import OpenButton from './components/Buttons/OpenButton';

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
      <OpenButton setModuleOpen={setModuleOpen} />
    </div>
  );
}

export default App;
