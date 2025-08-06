function CircleTimer({ currentTime, originalTime, isRunning, isThisTimer }) {
  // ADD THESE CONSOLE LOGS TO SEE WHAT'S HAPPENING
  console.log('CircleTimer props:', {
    currentTime,
    originalTime,
    isRunning,
    isThisTimer,
  });

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Check for invalid values
  if (!originalTime || originalTime <= 0) {
    console.log('Invalid originalTime:', originalTime);
    return <div>No task time available</div>;
  }

  if (currentTime === undefined || currentTime === null) {
    console.log('Invalid currentTime:', currentTime);
    return <div>No current time available</div>;
  }

  // Progress should be: how much time has PASSED, not remaining
  const progress = (originalTime - currentTime) / originalTime;
  console.log(
    'Progress calculation: (',
    originalTime,
    '-',
    currentTime,
    ') /',
    originalTime,
    '=',
    progress
  );

  return (
    <div>
      {/* ADD THIS DEBUG INFO TEMPORARILY */}
      <div style={{ color: 'white', fontSize: '12px' }}>
        Current: {currentTime}s | Original: {originalTime}s | Progress:{' '}
        {progress.toFixed(2)}
      </div>

      <svg width="300" height="300" viewBox="0 0 120 120">
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor="black" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="inverse" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

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
            isThisTimer && currentTime < 60
              ? 'var(--red-mid)'
              : 'var(--green-mid)'
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
    </div>
  );
}

export default CircleTimer;
