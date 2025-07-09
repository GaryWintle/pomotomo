import { useState, useEffect } from 'react';

function Task({ task }) {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(task.taskTime);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCountdown((cdown) => cdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setCountdown]);

  return (
    <li className="task-wrapper">
      <button className="task-timer" onClick={() => setIsRunning((go) => !go)}>
        {countdown}
      </button>
      <span className="task-text">{task.taskText}</span>
    </li>
  );
}

export default Task;
