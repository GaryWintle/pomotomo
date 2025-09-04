import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInput, TimeInput } from '@components/TaskModule';
import styles from './TaskInput.module.css';
import close from '@assets/xplus.svg';

function TaskInput({ onAddTask, setModuleOpen, setActiveMachine }) {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) return;
    const newTask = { taskText, taskTime, completed: false, id: Date.now() };
    console.log(newTask);
    onAddTask(newTask);
    setTaskText('');
    setTaskTime(0);
    setModuleOpen((prev) => !prev);
  }

  return (
    <AnimatePresence>
      <motion.form
        className={styles.container}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <TextInput
          taskText={taskText}
          setTaskText={setTaskText}
          setActiveMachine={setActiveMachine}
        />

        <TimeInput taskTime={taskTime} setTaskTime={setTaskTime} />

        <button type="submit" className={styles.addButton}>
          Add Task
        </button>

        <button type="button" className={styles.closeButton}>
          <img
            src={close}
            alt="close button"
            onClick={() => setModuleOpen((prev) => !prev)}
          />
        </button>
      </motion.form>
    </AnimatePresence>
  );
}

export default TaskInput;
