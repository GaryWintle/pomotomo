import { createContext, useState } from 'react';
import { PomoText, PomoCharacter } from '@components/Pomotomo';
import { TaskList } from '@components/Tasks';
import { TaskInput } from '@components/TaskModule';
import OpenButton from '@components/Buttons/OpenButton';
import { useLocalStorage } from '@hooks/useLocalStorage';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import WeatherTest from './components/Tests/APITesting';
import { UseCard, Button, Card } from './components/Tests/ScratchPad';

export const TaskContext = createContext();

function App() {
  const [task, setTask] = useLocalStorage([], 'task');

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [activeMachine, setActiveMachine] = useState('startPomo');
  const [moduleOpen, setModuleOpen] = useState(false);
  const [pomoText, setPomoText] = useState('');

  function handleAddTask(newTask) {
    setTask((tasks) => [...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    setTask((prev) => prev.filter((task) => task.id !== id));
  }

  const getTaskPos = (id) => task.findIndex((task) => task.id === id);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (active.id === over.id) return;
    setTask((task) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(task, originalPos, newPos);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        activeTaskId,
        setActiveTaskId,
        isRunning,
        countdown,
      }}
    >
      <div className="main-container">
        <WeatherTest />
        {/* <PomoText pomoText={pomoText} setPomoText={setPomoText} /> */}
        <UseCard name="Casey" age="2" />
        <Button color={'red'} />
        <Card
          title={'Hello'}
          subtitle={'World'}
          className={'My Card'}
          id={'card-1'}
          onClick={() => {}}
        />

        <PomoCharacter activeMachine={activeMachine} />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <TaskList
            task={task}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            setPomoText={setPomoText}
          />
        </DndContext>
        {!moduleOpen && <OpenButton setModuleOpen={setModuleOpen} />}
        {moduleOpen && (
          <TaskInput
            onAddTask={handleAddTask}
            setActiveMachine={setActiveMachine}
            setModuleOpen={setModuleOpen}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
}

export default App;
