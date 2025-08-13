import { useState } from 'react';
import { PomoText, PomoCharacter } from '@components/Pomotomo';
import { TaskList } from '@components/Tasks';
import { TaskInput } from '@components/TaskModule';
import OpenButton from '@components/Buttons/OpenButton';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

function App() {
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState('');
  const [task, setTask] = useLocalStorage([], 'task');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
    console.log(task);
  }

  function handleDeleteTask(id) {
    setTask((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="main-container">
      <PomoText pomoText={pomoText} setPomoText={setPomoText} />
      <PomoCharacter activeMachine={activeMachine} />
      <TaskList
        task={task}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
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
