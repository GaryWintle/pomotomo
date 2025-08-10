import { useEffect, useState } from 'react';
import { PomoText, PomoCharacter } from '@components/Pomotomo';
import { TaskList } from '@components/Tasks';
import { TaskInput } from '@components/TaskModule';
import OpenButton from '@components/Buttons/OpenButton';

const testTasks = [
  {
    taskText: 'Coding Practice',
    taskTime: 60,
    completed: false,
    id: 1754523196574,
  },
  {
    taskText: 'Studying Japanese',
    taskTime: 300,
    completed: false,
    id: 1754523196575,
  },
  {
    taskText: 'Cleaning Room',
    taskTime: 650,
    completed: true,
    id: 1754523196574,
  },
];

function App() {
  const [task, setTask] = useState(() => {
    const storedTask = localStorage.getItem('task');
    return JSON.parse(storedTask);
  });
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState('');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
    console.log(task);
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(task));
  }, [task]);

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
