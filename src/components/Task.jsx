import { useState, useEffect } from 'react';

function Task({ task }) {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(task.taskTime);

  let timerColor = 'var(--green-mid) ';

  function formatTime(countdown) {
    let hours = Math.floor(countdown / 3600);
    let minutes = Math.floor((countdown % 3600) / 60);
    let seconds = Math.floor(countdown % 60);
    const pad = (num) => String(num).padStart(2, '0');
    return `${hours}h${pad(minutes)}m${pad(seconds)}`;
  }

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

  return (
    <li className="task-wrapper">
      <button
        className="task-timer"
        onClick={() => setIsRunning((go) => !go)}
        style={{ backgroundColor: timerColor }}
      >
        {formatTime(countdown)}
        {/* {countdown} */}
      </button>
      <span className="task-text">{task.taskText}</span>
    </li>
  );
}

export default Task;
