import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import OpenButton from './components/Buttons/OpenButton';

function App() {
  const [task, setTask] = useState([]);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState("Let's get our groove on!");
  const [activeMachine, setActiveMachine] = useState('bounceAnim');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <PomoText pomoText={pomoText} setPomoText={setPomoText} />
      <Pomotomo activeMachine={activeMachine} />
      <TaskList
        task={task}
        onAddTask={handleAddTask}
        setPomoText={setPomoText}
      />
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
