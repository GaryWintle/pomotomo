// components/Timer/Timer.jsx
import { useState, useEffect } from 'react';

function Timer({ activeTask, isRunning, onTimerToggle }) {
  const [countdown, setCountdown] = useState(0);

  // Update countdown when activeTask changes
  useEffect(() => {
    if (activeTask?.taskTime) {
      setCountdown(activeTask.taskTime);
    }
  }, [activeTask]);

  // Timer logic
  useEffect(() => {
    if (!isRunning || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Timer finished - you might want to call a callback here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, countdown]);

  // Update document title
  useEffect(() => {
    document.title = `${countdown}s`;
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = activeTask?.taskTime
    ? (countdown / activeTask.taskTime) * 100
    : 0;

  return (
    <div className="timer-container">
      <div className="timer-circle">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#646cff"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="timer-text">
          <div className="time-display">{formatTime(countdown)}</div>
          <button
            onClick={onTimerToggle}
            className="timer-button"
            disabled={!activeTask}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
