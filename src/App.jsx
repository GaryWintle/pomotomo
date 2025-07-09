import { useEffect, useState } from 'react';

import PomoText from './components/PomoText';
import Pomotomo from './components/Pomotomo';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './reset.css';
import './index.css';

import Header from './components/Header';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <div className="pomotomo-container">
        <PomoText />
        <Pomotomo activeMachine={activeMachine} />
      </div>
      <TaskInput
        onAddTask={handleAddTask}
        setActiveMachine={setActiveMachine}
      />
      <TaskList task={task} onAddTask={handleAddTask} />
      <Header />
    </div>
  );
}

export default App;
