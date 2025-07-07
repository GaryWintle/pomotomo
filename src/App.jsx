import { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './reset.css';
import './index.css';
import Pomotomo from './components/Pomotomo';

// const testTaskList = [
//   { id: 1, title: 'Learn React hooks', completed: false },
//   { id: 2, title: 'Build pomodoro timer', completed: false },
//   { id: 3, title: 'Style with CSS modules', completed: false },
// ];

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <Pomotomo activeMachine={activeMachine} />
      {/* <TaskInput
        onAddTask={handleAddTask}
        setActiveMachine={setActiveMachine}
      /> */}
      <TaskList task={task} />
      <Header />
    </div>
  );
}

export default App;
