import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import OpenButton from './components/Buttons/OpenButton';

// const taskExamples = [
//   {
//     taskText: 'Coding Practice',
//     taskTime: 300,
//     completed: false,
//     id: Date.now(),
//   },
//   {
//     taskText: 'Walk Aphie',
//     taskTime: 1500,
//     completed: false,
//     id: Date.now(),
//   },
//   {
//     taskText: 'Anki Flash Cards',
//     taskTime: 600,
//     completed: false,
//     id: Date.now(),
//   },
//   {
//     taskText: 'React Practice',
//     taskTime: 4000,
//     completed: false,
//     id: Date.now(),
//   },
//   { taskText: 'Make Lunch', taskTime: 900, completed: false, id: Date.now() },
// ];

function App() {
  const [task, setTask] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runningTaskId, setRunningTaskId] = useState(null);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState("Let's get our groove on!");
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [taskRemainingTimes, setTaskRemainingTimes] = useState({});

  const selectedTask = task.find((prev) => prev.id === selectedTaskId);

  const getRemainingTime = (taskId, originalTime) => {
    return taskRemainingTimes[taskId] ?? originalTime;
  };

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  useEffect(() => {
    if (!isRunning || !runningTaskId) return;

    const interval = setInterval(() => {
      setTaskRemainingTimes((prev) => {
        const currentTime = prev[runningTaskId];
        if (currentTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setRunningTaskId(null);
          return { ...prev, [runningTaskId]: 0 };
        }
        return { ...prev, [runningTaskId]: currentTime - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, runningTaskId]);

  useEffect(() => {
    if (runningTaskId) {
      const currentTime = taskRemainingTimes[runningTaskId];
      if (currentTime !== undefined) {
        document.title = `${currentTime}s`;
      }
    }
  }, [taskRemainingTimes, runningTaskId]);

  return (
    <div className="main-container">
      {selectedTask ? (
        <div>
          <p>{selectedTask.taskText}</p>
        </div>
      ) : (
        <PomoText pomoText={pomoText} setPomoText={setPomoText} />
      )}
      <Pomotomo activeMachine={activeMachine} />
      <TaskList
        task={task}
        onAddTask={handleAddTask}
        setPomoText={setPomoText}
        setSelectedTaskId={setSelectedTaskId}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        runningTaskId={runningTaskId}
        setRunningTaskId={setRunningTaskId}
        taskRemainingTimes={taskRemainingTimes}
        setTaskRemainingTimes={setTaskRemainingTimes}
        getRemainingTime={getRemainingTime}
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
