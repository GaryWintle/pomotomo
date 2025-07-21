import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import OpenButton from './components/Buttons/OpenButton';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(false);

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <PomoText />
      <Pomotomo activeMachine={activeMachine} />
      <TaskList task={task} onAddTask={handleAddTask} />
      {!moduleOpen && <OpenButton setModuleOpen={setModuleOpen} />}
      <AnimatePresence>
        {moduleOpen && (
          <TaskInput
            onAddTask={handleAddTask}
            setActiveMachine={setActiveMachine}
            setModuleOpen={setModuleOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
