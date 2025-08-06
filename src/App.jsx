import { useState } from 'react';
import { PomoText, PomoCharacter } from '@components/Pomotomo';
import { TaskList } from '@components/Tasks';
import { TaskInput } from '@components/TaskModule';
import OpenButton from '@components/Buttons/OpenButton';

function App() {
  const [task, setTask] = useState([]);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState("Let's get our groove on!");

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  return (
    <div className="main-container">
      <PomoText pomoText={pomoText} setPomoText={setPomoText} />
      <PomoCharacter activeMachine={activeMachine} />
      <TaskList
        task={task}
        onAddTask={handleAddTask}
        setPomoText={setPomoText}
      />
      {!moduleOpen && <OpenButton setModuleOpen={setModuleOpen} />}
      {moduleOpen && (
        <TaskInput
          onAddTask={handleAddTask}
          setActiveMachine={setActiveMachine}
          setModuleOpen={setModuleOpen}
        />
      )}
    </div>
  );
}

export default App;
