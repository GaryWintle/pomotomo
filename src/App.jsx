import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PomoText from './components/PomoText/PomoText';
import Pomotomo from './components/Pomotomo/Pomotomo';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import Timer from './components/Timer/Timer';
import OpenButton from './components/Buttons/OpenButton';

function App() {
  const [task, setTask] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeMachine, setActiveMachine] = useState('bounceAnim');
  const [moduleOpen, setModuleOpen] = useState(true);
  const [pomoText, setPomoText] = useState("Let's get our groove on!");
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Get the active task
  const activeTask = task.find((t) => t.id === activeTaskId);

  // Update countdown when active task changes
  useEffect(() => {
    if (activeTask?.taskTime) {
      setCountdown(activeTask.taskTime);
    }
  }, [activeTask]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCountdown((cdown) => {
        if (cdown <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return cdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    document.title = `${countdown}s`;
  }, [countdown]);

  function handleTimerButton() {
    setIsRunning((prev) => !prev);
    setPomoText('Okay, time to focus!');
  }

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
    // Auto-select first task if none selected
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  }

  function handleSetActiveTask(taskId) {
    setActiveTaskId(taskId);
    setIsRunning(false); // Stop timer when switching
  }

  return (
    <div className="main-container">
      <PomoText pomoText={pomoText} setPomoText={setPomoText} />
      <Pomotomo activeMachine={activeMachine} />

      {/* Timer component with countdown from App */}
      {activeTask && (
        <Timer
          activeTask={activeTask}
          isRunning={isRunning}
          onTimerToggle={handleTimerButton}
          countdown={countdown} // Pass countdown from App
        />
      )}

      <TaskList
        tasks={task} // ✅ Fixed prop name
        activeTaskId={activeTaskId}
        onAddTask={handleAddTask}
        onSetActiveTask={handleSetActiveTask}
        setPomoText={setPomoText}
        isRunning={isRunning}
        countdown={countdown}
        onTimerButton={handleTimerButton}
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
