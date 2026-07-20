import { useContext } from 'react';
import { TaskContext } from '../../../App';
import { Task } from '@components/Tasks';
import styles from './TaskList.module.css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function TaskList({ setPomoText }) {
  const { task } = useContext(TaskContext);
  return (
    <ul className={styles.container}>
      <SortableContext items={task} strategy={verticalListSortingStrategy}>
        {task.map((singleTask) => (
          <Task
            key={singleTask.id}
            id={singleTask.id}
            task={singleTask}
            setPomoText={setPomoText}
          />
        ))}
      </SortableContext>
    </ul>
  );
}

export default TaskList;
