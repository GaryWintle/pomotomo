import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TextInput from '../TextInput/TextInput';
import TimeInput from '../TimeInput/TimeInput';
import styles from './TaskInput.module.css';
import close from '../../assets/xplus.svg';

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
    <motion.form
      className={styles.container}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
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
  );
}

export default TaskInput;
