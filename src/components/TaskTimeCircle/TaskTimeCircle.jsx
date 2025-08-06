function TaskTimeCircle({ task, countdown, isRunning }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = task.taskTime > 0 ? countdown / task.taskTime : 0;

  return (
    <>
      <svg width="300" height="300" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#eee"
          fill="none"
          strokeWidth="10"
          filter="url(#inner-shadow)"
        />

        <motion.circle
          filter="url(#glow)"
          cx="60"
          cy="60"
          r="50"
          stroke={
            isRunning && countdown < 60 ? 'var(--red-mid)' : 'var(--green-mid)'
          }
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          initial={false}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
    </>
  );
}

export default TaskTimeCircle;
