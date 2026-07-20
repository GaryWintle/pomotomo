import { TaskContext } from '../../../App';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import styles from './Task.module.css';
import close from '@assets/xplus.svg';

function Task({ task, id }) {
  //useContext
  const { onDeleteTask } = useContext(TaskContext);

  //Drag and Drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  //Drag and Drop Extra Styling
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <motion.div
      className={styles.taskContainer}
      animate={{
        scale: isDragging ? 1.03 : 1,
      }}
      transition={{ duration: 0.2 }}
      style={{ width: '100%', height: '100%' }}
    >
      <li
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={styles.task}
      >
        <div {...listeners}>
          <span className={styles.text}>{task.taskText}</span>
        </div>

        <button type="button" className={styles.closeButton}>
          <img src={close} alt="close" onClick={() => onDeleteTask(task.id)} />
        </button>
      </li>
    </motion.div>
  );
}

export default Task;
